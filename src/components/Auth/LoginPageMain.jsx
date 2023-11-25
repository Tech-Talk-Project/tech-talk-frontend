import React, { useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import isLoggedInState from "../../recoil/atoms/auth";
import { login } from "../../apis/auth";
import { setCookie } from "../../utils/cookie";
import LoginLoading from "./LoginLoading";

export default function LoginPageMain() {
  const navigate = useNavigate();
  const { provider } = useParams();
  const [searchParams] = useSearchParams();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const { error, data } = useQuery({
    queryKey: ["login"],
    queryFn: () => login({ code: searchParams.get("code"), provider }),
  });

  useEffect(() => {
    if (data) {
      const { accessToken, refreshTokenExpirationInMilliSeconds } = data;
      setIsLoggedIn(true);
      setCookie("accessToken", accessToken, {
        path: "/",
        expires: new Date(refreshTokenExpirationInMilliSeconds),
      });
      navigate("/");
    }
  }, [data, setIsLoggedIn, navigate]);

  if (error) {
    return <div>{error.message}</div>;
  }
  return <LoginLoading />;
}