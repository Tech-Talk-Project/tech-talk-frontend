import { Typography } from "@material-tailwind/react";
import React from "react";
import { getDateInfo } from "../../../../utils/date";
import RecruitmentToggle from "./RecruitmentToggle";
import { useMutation } from "@tanstack/react-query";
import { changeRecruitment } from "../../../../apis/board";
import { useParams, useSearchParams } from "react-router-dom";
import { queryClient } from "../../../../apis/queryClient";
import { BOARD_QUERY_KEYS } from "../../../../constants/queryKeys";

export default function PostContentInfo({
  title,
  updatedAt,
  createdAt,
  recruitmentActive,
  viewCount,
}) {
  const { postId } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("type").toUpperCase();
  const changeRecruitmentMutate = useMutation({
    mutationFn: () => changeRecruitment({ postId, category }),
    onSuccess: () => {
      queryClient.invalidateQueries(BOARD_QUERY_KEYS.post(postId));
    },
  });

  const handleRecruitmentClick = () => {
    changeRecruitmentMutate.mutate({ postId, category });
  };
  return (
    <article className="flex gap-2 items-end justify-between pb-4 border-b border-blue-gray-800">
      <div>
        <Typography variant="h3">{title}</Typography>
        <div className="flex gap-3">
          <Typography className="text-blue-gray-200">
            {updatedAt
              ? getDateInfo(new Date(updatedAt))
              : getDateInfo(new Date(createdAt))}{" "}
            작성
          </Typography>
          <Typography className="text-blue-gray-200">
            조회수 {viewCount}
          </Typography>
        </div>
      </div>
      <RecruitmentToggle
        recruitmentActive={recruitmentActive}
        onClick={handleRecruitmentClick}
      />
    </article>
  );
}
