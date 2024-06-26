import React, { memo, useEffect, useRef } from "react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Spinner } from "@material-tailwind/react";
import { useRecoilValue } from "recoil";
import UsersGrid from "./User/UsersGrid";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { getUsersDataWithLogin, getUsersData } from "../../apis/user";
import { USERS_QUERY_KEYS } from "../../constants/queryKeys";
import { isLoggedInState } from "../../recoil/atoms/auth";

const USERS_COUNT = 15;

const MainPageMain = ({ filters }) => {
  const observerRef = useRef(null);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, error } =
    useSuspenseInfiniteQuery({
      queryKey: USERS_QUERY_KEYS.usersData(filters.toSorted()),
      queryFn: ({ pageParam = null }) => {
        if (isLoggedIn)
          return getUsersDataWithLogin({
            cursor: pageParam,
            limit: USERS_COUNT,
            skills: filters,
          });

        return getUsersData({
          cursor: pageParam,
          limit: USERS_COUNT,
          skills: filters,
        });
      },
      getNextPageParam: (lastPage) => lastPage.nextCursor || null,
    });
  const [observe, unobserve] = useIntersectionObserver(fetchNextPage);

  useEffect(() => {
    if (!hasNextPage || !observerRef) return;
    const observer = observerRef.current;
    observe(observer);

    return () => unobserve(observer);
  }, [observerRef, hasNextPage, observe, unobserve]);

  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      <section className="grow">
        <UsersGrid users={data.pages} />
      </section>
      <div ref={observerRef} className="flex justify-center items-center">
        {isFetchingNextPage && <Spinner className="h-8 w-8 text-brand" />}
      </div>
    </>
  );
};

export default memo(MainPageMain);
