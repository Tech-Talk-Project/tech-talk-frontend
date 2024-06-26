import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BOARD_QUERY_KEYS } from "../../../constants/queryKeys";
import { getBoardData } from "../../../apis/board";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../Main/Common/Pagination";
import NullBoard from "./NullBoard";
import Posts from "./Posts";
import Button from "../../Common/Button";
import { isLoggedInState } from "../../../recoil/atoms/auth";
import { PATH } from "../../../constants/path";

export default function BoardPageMain() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [page, setPage] = useState(1);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const {
    data: { boardList, totalPage },
  } = useSuspenseQuery({
    queryKey: BOARD_QUERY_KEYS.board(page, type),
    queryFn: () => getBoardData({ page, category: type.toUpperCase() }),
    keepPreviousData: true,
  });
  const {
    length,
    pageStart,
    getItemProps,
    handleNextClick,
    handleFirstPageClick,
    handleLastPageClick,
    handlePrevClick,
  } = usePagination({ page, setPage, totalPage });

  const handleCreateClick = () => {
    if (isLoggedIn) {
      navigate(PATH.createBoardWithType(type));
    } else {
      navigate(PATH.login);
    }
  };

  return (
    <section className="flex flex-col justify-between gap-2 h-full">
      {boardList.length === 0 ? (
        <NullBoard onCreateClick={handleCreateClick} />
      ) : (
        <>
          <div className="flex justify-end sm:mt-2">
            <Button
              onClick={handleCreateClick}
              className="bg-brand text-sm py-1 sm:py-2 px-4 sm:px-6"
            >
              글쓰기
            </Button>
          </div>
          <Posts boardList={boardList} />
          <Pagination
            length={length}
            pageStart={pageStart}
            page={page}
            totalPage={totalPage}
            onFirstPageClick={handleFirstPageClick}
            onLastPageClick={handleLastPageClick}
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick}
            getItemProps={getItemProps}
          />
        </>
      )}
    </section>
  );
}
