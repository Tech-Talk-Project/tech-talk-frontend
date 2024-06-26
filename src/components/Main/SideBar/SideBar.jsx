import React from "react";
import { useRecoilValue } from "recoil";
import { Typography } from "@material-tailwind/react";
import { createNewChatState } from "../../../recoil/atoms/newChat";
import { newChatMemberState } from "../../../recoil/atoms/newChat";
import SideBarCategoryList from "./SideBarCategoryList";
import SideBarNewChatMemberList from "./SideBarNewChatMemberList";
import NewChatTitleModal from "../../Common/Modal/NewChatTitleModal";
import CreateChatButtonGroup from "../Common/CreateChatButtonGroup";

export default function SideBar({ isModalOpen, onModalClick }) {
  const newChatMembers = useRecoilValue(newChatMemberState);
  const createNewChat = useRecoilValue(createNewChatState);

  return (
    <aside className="hidden md:block fixed top-20 left-0 max-w-[16rem] w-full h-main p-4 bg-light_black border-r border-blue-gray-800">
      <SideBarCategoryList createNewChat={createNewChat} />
      {createNewChat && (
        <article
          className={`mt-4 w-full ${
            createNewChat ? "h-1/2 flex flex-col justify-between" : ""
          } border-t border-blue-gray-100 overflow-auto`}
        >
          {newChatMembers.length === 0 ? (
            <Typography
              variant="paragraph"
              className="pt-4 text-gray-600 font-normal"
            >
              체크박스를 클릭해 멤버를 추가할 수 있습니다.
            </Typography>
          ) : (
            <SideBarNewChatMemberList newChatMembers={newChatMembers} />
          )}
          <CreateChatButtonGroup onModalClick={onModalClick} mobile={true} />
        </article>
      )}
      <NewChatTitleModal isOpen={isModalOpen} onClick={onModalClick} />
    </aside>
  );
}
