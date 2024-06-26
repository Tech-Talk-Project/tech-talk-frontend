import React, { useEffect, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CHAT_QUERY_KEYS } from "../../../constants/queryKeys";
import useChat from "../../../hooks/useChat";
import { getChattingData } from "../../../apis/chat";
import ChatForm from "./ChatForm";
import { memberIdState } from "../../../recoil/atoms/auth";
import ChattingList from "./ChattingList";
import prevChatRoomIdState from "../../../recoil/atoms/chatRoomId";
import ChattingInfo from "./ChattingInfo";

export default function ChattingColumn() {
  const { chatRoomId } = useParams();
  const [chatList, setChatList] = useState([]);
  const memberId = useRecoilValue(memberIdState);
  const setPrevChatRoomId = useSetRecoilState(prevChatRoomIdState);
  const {
    error,
    data: { title, ownerId, messages, unreadCount, members },
  } = useSuspenseQuery({
    queryKey: CHAT_QUERY_KEYS.chatData(chatRoomId),
    queryFn: () => getChattingData({ chatRoomId }),
    refetchOnWindowFocus: false,
  });

  const handleChatList = (newChat) => {
    setChatList((prev) => [...prev, JSON.parse(newChat)]);
  };
  const { connect, disconnect, sendMessage } = useChat(
    "CHAT_ROOM",
    chatRoomId,
    memberId,
    handleChatList
  );

  useEffect(() => {
    setChatList(messages);
  }, [messages, setChatList]);

  useEffect(() => {
    connect();
    setPrevChatRoomId(chatRoomId);

    return () => disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomId]);

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <article className="flex flex-col gap-1 grow pl-4 md:pl-2 pr-4 py-4 max-h-full h-full w-full md:w-[calc(100vw-42rem)]">
      <ChattingInfo
        title={title}
        ownerId={ownerId}
        members={members}
        chatRoomId={chatRoomId}
      />
      <ChattingList
        memberId={memberId}
        chatRoomId={chatRoomId}
        firstChatData={messages}
        members={members}
        chatList={chatList}
        setChatList={setChatList}
        unreadCount={unreadCount}
      />
      <ChatForm sendMessage={sendMessage} />
    </article>
  );
}
