import React from "react";
import { Typography } from "@material-tailwind/react";
import { AiOutlineEye } from "@react-icons/all-files/ai/AiOutlineEye";
import { MdThumbUp } from "@react-icons/all-files/md/MdThumbUp";
import { BsFillChatDotsFill } from "@react-icons/all-files/bs/BsFillChatDotsFill";
import useBreakpoint from "../../../hooks/useBreakPoint";
import { getDateInfo } from "../../../utils/date";

export default function PostInfo({
  author,
  createdAt,
  updatedAt,
  viewCount,
  likeCount,
  disLikeCount,
  commentCount,
}) {
  const { isSmallMobile } = useBreakpoint();

  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex items-center gap-2">
        <Typography variant="small" className="text-white font-medium">
          {author.name}
        </Typography>
        {!isSmallMobile && (
          <Typography variant="small" className="text-white font-medium">
            {updatedAt
              ? getDateInfo(new Date(updatedAt))
              : getDateInfo(new Date(createdAt))}
          </Typography>
        )}
      </div>
      <ul className="flex items-center gap-4">
        <li className="flex items-center gap-2 text-white font-medium">
          <AiOutlineEye />
          <Typography className="mt-1">{viewCount}</Typography>
        </li>
        <li className="flex items-center gap-2 text-white font-medium">
          <MdThumbUp />
          <Typography className="mt-1">{likeCount - disLikeCount}</Typography>
        </li>
        <li className="flex items-center gap-2 text-white font-medium">
          <BsFillChatDotsFill />
          <Typography className="mt-1">{commentCount}</Typography>
        </li>
      </ul>
    </div>
  );
}
