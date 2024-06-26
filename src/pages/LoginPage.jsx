import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "@material-tailwind/react";
import { SiGithub } from "@react-icons/all-files/si/SiGithub";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import { ReactComponent as Naver } from "../assets/images/logo/naver.svg";
import Logo from "../components/Common/Image/Logo";
import OauthLoginButton from "../components/Login/OauthLoginButton";
import DividerWithText from "../components/Common/DividerWithText";

const TYPES = [
  {
    title: "Google",
    redirect_url: process.env.REACT_APP_GOOGLE_REDIRECT_URL,
    color: "bg-white",
    logo: <FcGoogle size={28} />,
  },
  {
    title: "Github",
    redirect_url: `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_REDIRECT_URL}`,
    color: "bg-brand",
    logo: <SiGithub size={28} />,
  },
  {
    title: "Naver",
    redirect_url: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
      process.env.REACT_APP_NAVER_CLIENT_ID
    }&state=${uuidv4()}&redirect_uri=${
      process.env.REACT_APP_NAVER_REDIRECT_URL
    }`,
    color: "bg-white",
    logo: <Naver width="2rem" height="2rem" />,
  },
];

export default function LoginPage() {
  return (
    <main className="relative flex flex-col justify-center items-center gap-8 sm:border px-20 py-12 border-line rounded-lg bg-opacity-50">
      <Logo size="lg" />
      <section>
        <DividerWithText>Social Login</DividerWithText>
        <ul className="flex flex-col gap-2 ">
          {TYPES.map((type) => (
            <li key={uuidv4()}>
              <OauthLoginButton type={type} />
            </li>
          ))}
        </ul>
      </section>
      <Typography className="hidden md:block absolute -left-40 my-auto text-8xl font-bold blur-sm">
        <span className="text-brand">T</span>ech
      </Typography>
      <Typography className="hidden md:block absolute -right-32 my-auto text-8xl font-bold blur-sm">
        <span className="text-brand">T</span>alk
      </Typography>
    </main>
  );
}
