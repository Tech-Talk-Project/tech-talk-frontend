import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams, useSearchParams } from "react-router-dom";
import Comment from "./Comment";
import useModal from "../../../../hooks/useModal";
import DeleteConfirmModal from "../Common/DeleteConfirmModal";
import useBoard from "../../../../hooks/useBoard";

export default function Comments({ comments }) {
  const { postId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useModal();
  const { commentDeleteMutate } = useBoard({ postId });

  const handleModalClick = () => {
    setIsDeleteConfirmOpen((prev) => !prev);
  };
  const handleDeleteClick = () => {
    commentDeleteMutate.mutate(
      { commentId: searchParams.get("comment_id") },
      {
        onSuccess: () => {
          setIsDeleteConfirmOpen((prev) => !prev);
          setSearchParams({ type: searchParams.get("type") });
        },
      }
    );
  };
  return (
    <article className="mt-6 border-t border-blue-gray-800">
      <ul
        className={`flex flex-col ${comments.length === 0 ? "" : "py-4"} gap-2`}
      >
        {comments.map((comment) => (
          <Comment
            key={uuidv4()}
            comment={comment}
            onModalClick={handleModalClick}
          />
        ))}
      </ul>
      <DeleteConfirmModal
        isOpen={isDeleteConfirmOpen}
        setIsOpen={setIsDeleteConfirmOpen}
        onDeleteClick={handleDeleteClick}
        title="정말 댓글을 삭제하시겠습니까?"
        content="확인 버튼 클릭 시, 댓글은 삭제되며 복구할 수 없습니다."
      />
    </article>
  );
}
