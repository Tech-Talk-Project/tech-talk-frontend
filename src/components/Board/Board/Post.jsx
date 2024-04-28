import React from "react";
import { Chip, Typography } from "@material-tailwind/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Tags from "./Tags";
import { BOARD_CATEGORIE_WITHOUT_TOGGLE_TYPES } from "../../../constants/category";
import PostInfo from "./PostInfo";

export default function Post({
  post: {
    boardId,
    title,
    content,
    recruitmentActive,
    tags,
    author,
    createdAt,
    updatedAt,
    viewCount,
    likeCount,
    commentCount,
  },
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const handleClick = () => {
    navigate(`/board/post/${boardId}?type=${type}`);
  };
  return (
    <li
      className="flex flex-col gap-1 p-3 border-b border-blue-gray-800 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        {!BOARD_CATEGORIE_WITHOUT_TOGGLE_TYPES.includes(type) && (
          <Chip
            size="md"
            value={recruitmentActive ? "모집중" : "모집마감"}
            className={recruitmentActive ? "bg-brand" : ""}
          />
        )}
        <Typography variant="h5">{title}</Typography>
      </div>
      <Typography
        variant="h5"
        className="text-blue-gray-200 font-medium truncate"
      >
        {content}
      </Typography>
      <Tags tags={tags} />
      <PostInfo
        author={author}
        createdAt={createdAt}
        updatedAt={updatedAt}
        viewCount={viewCount}
        likeCount={likeCount}
        commentCount={commentCount}
      />
    </li>
  );
}