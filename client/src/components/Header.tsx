import { GoHome, GoHomeFill } from "react-icons/go";
import { FaHeart, FaRegUser, FaUser } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { useAuthStore } from "../store/authStore";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  children: React.ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  const { logout }: any = useAuthStore();

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="bg-[#fafafa] border-gray-200 px-4 lg:px-6 py-2.5 mb-6 fixed top-0 left-0 right-0 z-10">
        <div className="flex flex-wrap justify-between items-center mx-auto">
          <a href="#" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap ">
              Blog WebSite
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            <button
              onClick={handleLogOut}
              className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-800 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none "
            >
              Đăng xuất
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className="block py-2 px-4 rounded-xl hover:bg-gray-300 text-gray-700 hover:-translate-y-1 transform transition"
                >
                  {({ isActive }) =>
                    isActive ? (
                      <GoHomeFill className="size-6" />
                    ) : (
                      <GoHome className="size-6" />
                    )
                  }
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tim-kiem"
                  className="block py-2 px-4 rounded-xl hover:bg-gray-300 text-gray-700 hover:-translate-y-1 transform transition"
                >
                  {({ isActive }) =>
                    isActive ? (
                      <FaSearch className="size-6" />
                    ) : (
                      <GoSearch className="size-6" />
                    )
                  }
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/hoat-dong"
                  className="block py-2 px-4 rounded-xl hover:bg-gray-300 text-gray-700 hover:-translate-y-1 transform transition"
                >
                  {({ isActive }) =>
                    isActive ? (
                      <FaHeart className="size-6" />
                    ) : (
                      <FaRegHeart className="size-6" />
                    )
                  }
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className="block py-2 px-4 rounded-xl hover:bg-gray-300 text-gray-700 hover:-translate-y-1 transform transition"
                >
                  {({ isActive }) =>
                    isActive ? (
                      <FaUser className="size-6" />
                    ) : (
                      <FaRegUser className="size-6" />
                    )
                  }
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="mt-20">{children}</div>
    </>
  );
};
