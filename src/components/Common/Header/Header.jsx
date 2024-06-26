import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate, useLocation } from "react-router-dom";
import { MdMenu } from "@react-icons/all-files/md/MdMenu";
import Button from "../Button";
import { isLoggedInState, memberIdState } from "../../../recoil/atoms/auth";
import NavMenu from "./NavMenu";
import Logo from "../Image/Logo";
import { removeCookie } from "../../../utils/cookie";
import { createNewChatState } from "../../../recoil/atoms/newChat";
import { newChatMemberState } from "../../../recoil/atoms/newChat";
import { logout } from "../../../apis/auth";
import MobileSideBar from "./MobileSideBar";
import useToast from "../../../hooks/useToast";
import { PATH } from "../../../constants/path";

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const setMemberId = useSetRecoilState(memberIdState);
  const setCreateNewChat = useSetRecoilState(createNewChatState);
  const setNewChatMembers = useSetRecoilState(newChatMemberState);
  const { showToast } = useToast();

  const handleLogoutClick = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      setMemberId(null);
      setCreateNewChat(false);
      setNewChatMembers([]);
      removeCookie("accessToken", { path: "/" });
      navigate(PATH.home);
    } catch (error) {
      showToast("잠시후에 다시 시도해 주세요.");
    }
  };
  const handleOpenClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <header className="fixed top-0 flex justify-center items-center w-full h-14 sm:h-20 text-lg bg-light_black border-b border-blue-gray-800 z-[9998]">
      <article className="flex justify-between items-center w-full max-w-7xl px-5">
        <Logo size="md" />
        <nav>
          <div className="md:flex hidden gap-8">
            <NavMenu path="/">Home</NavMenu>
            <NavMenu path="/board?type=project">Board</NavMenu>
            {isLoggedIn ? (
              <>
                <NavMenu path="/chatList">Chat</NavMenu>
                <NavMenu path="/profile">Profile</NavMenu>
                <Button
                  variant="text"
                  className="p-0 text-white text-lg font-normal hover:text-brand duration-100"
                  onClick={handleLogoutClick}
                >
                  Logout
                </Button>
              </>
            ) : (
              <NavMenu className="hidden md:block" path="/login">
                Login
              </NavMenu>
            )}
          </div>
          <div className="md:hidden">
            <Button
              onClick={handleOpenClick}
              variant="text"
              className="p-1 text-white"
            >
              <MdMenu size={24} />
            </Button>
            <MobileSideBar
              isOpen={isOpen}
              onOpenClick={handleOpenClick}
              pathname={pathname}
            />
          </div>
        </nav>
      </article>
    </header>
  );
}
