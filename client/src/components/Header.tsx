import { Button } from "@mui/material";
import { useAuthStore } from "../store/authStore";
import { Link, NavLink } from "react-router-dom";
import {
  Heart,
  House,
  LogOut,
  MoveLeft,
  Plus,
  Search,
  User,
} from "lucide-react";
import { useState } from "react";
import { ShowCreatePost } from "./post/ShowCreatePost";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-white md:bg-transparent md:hidden block py-2 px-4 z-10">
        <div className="flex justify-between items-center">
          <div
            className="p-1 bg-white border rounded-full cursor-pointer"
            onClick={handleBack}
          >
            <MoveLeft className="size-4" />
          </div>
          <Link to={"/"}>
            <img src="/logo.png" alt="" className="cursor-pointer" />
          </Link>
          <Button
            className="px-8 py-4 rounded-xl transition-all ease-in-out hover:bg-gray-300"
            onClick={handleLogout}
          >
            <LogOut className="size-8 text-black" />
          </Button>
        </div>
      </div>
      <div className="fixed md:top-0 left-0 bottom-0 w-full bg-white md:bg-transparent md:w-16 md:py-4 z-10 md:mx-1">
        <div className="flex md:flex-col md:justify-between md:h-full items-center">
          <Link to={"/"} className="md:block hidden">
            <img src="/logo.png" alt="" className="cursor-pointer" />
          </Link>
          <div className="flex flex-1 justify-between md:justify-center md:flex-col items-center md:gap-8">
            <NavLink to="/">
              {({ isActive }) =>
                isActive ? (
                  <div className="px-8 py-4 md:px-4 md:py-2 rounded-xl transition-all ease-in-out hover:bg-gray-300/30">
                    <House className="size-8" />
                  </div>
                ) : (
                  <div className="px-8 py-4 md:px-4 md:py-2 rounded-xl transition-all ease-in-out hover:bg-gray-300/30">
                    <House className="text-gray-500 size-8" />
                  </div>
                )
              }
            </NavLink>
            <NavLink to="/searchs">
              {({ isActive }) =>
                isActive ? (
                  <div className="px-8 py-4 md:px-4 md:py-2 rounded-xl transition-all ease-in-out hover:bg-gray-300/30">
                    <Search className="size-8" />
                  </div>
                ) : (
                  <div className="px-8 py-4 md:px-4 md:py-2 rounded-xl transition-all ease-in-out hover:bg-gray-300/30">
                    <Search className="text-gray-500 size-8" />
                  </div>
                )
              }
            </NavLink>
            <button onClick={() => setIsOpen(!isOpen)}>
              <div className="px-8 py-4 md:px-4 md:py-2 rounded-xl bg-gray-300/30">
                <Plus className="size-8 text-gray-500 hover:text-black" />
              </div>
            </button>
            <NavLink to="/notifications">
              {({ isActive }) =>
                isActive ? (
                  <div className="px-8 py-4 md:px-4 md:py-2 rounded-xl transition-all ease-in-out hover:bg-gray-300/30">
                    <Heart className="size-8" />
                  </div>
                ) : (
                  <div className="px-8 py-4 md:px-4 md:py-2 rounded-xl transition-all ease-in-out hover:bg-gray-300/30">
                    <Heart className="size-8 text-gray-500" />
                  </div>
                )
              }
            </NavLink>
            <NavLink to="/profile">
              {({ isActive }) =>
                isActive ? (
                  <div className="px-8 py-4 md:px-4 md:py-2 rounded-xl transition-all ease-in-out hover:bg-gray-300/30">
                    <User className="size-8 " />
                  </div>
                ) : (
                  <div className="px-8 py-4 md:px-4 md:py-2 rounded-xl transition-all ease-in-out hover:bg-gray-300/30">
                    <User className="size-8 text-gray-500" />
                  </div>
                )
              }
            </NavLink>
          </div>
          <button className="px-2 py-1 md:block hidden" onClick={handleLogout}>
            <LogOut className="size-8 " />
          </button>
        </div>
      </div>
      <ShowCreatePost isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
