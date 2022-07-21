import React from "react";
import { BiMenu } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import { AiFillHeart } from "react-icons/ai";
import { Logo } from "./Logo";
import { UserNavLinks } from "../helpers/UserNavLinks";
import { AdminNavLinks } from "../helpers/AdminNavLinks";

export const SideNavbar = ({ admin = null, user = null }) => {
  //toggle sidebar
  const sidebarHandler = () => {
    //get navbar
    const sidebar = document.getElementById("mobile-nav");
    //get close btn
    const closeBtn = document.getElementById("closeSidebar");
    //get close btn
    const showBtn = document.getElementById("openSideBar");

    if (sidebar.classList.contains("translate-x-[-260px]")) {
      //show navbar
      sidebar.classList.replace("translate-x-[-260px]", "translate-x-0");
    } else {
      //hide navbar
      sidebar.classList.replace("translate-x-0", "translate-x-[-260px]");
    }

    //change btns
    closeBtn.classList.toggle("hidden");
    showBtn.classList.toggle("hidden");
  };

  return (
    <>
      {/* Sidebar starts */}

      {/* Tablet/desktop Sidebar*/}
      <div className="w-64 absolute sm:relative bg-slate-50 shadow-lg flex-col justify-between hidden md:flex ">
        <div className="px-8 py-8 sticky top-0">
          {/* Logo */}
          <Logo />

          {/* Welcome Message */}
          <div className="flex items-center p-2 my-4 bg-blue-200 text-sm font-bold text-blue-800 border-r-4 border-blue-800 rounded shadow">
            <AiFillHeart className="mr-1" size={22} />
            <span className="w-full">
              {`Welcome, `}
              {admin && admin.name.split(" ")[0]}
              {user && user.name.split(" ")[0]}
            </span>
          </div>

          {/* Links */}
          <ul className="mt-12">
            {admin && <AdminNavLinks admin={admin} />}
            {user && <UserNavLinks user={user} />}
          </ul>
        </div>
      </div>

      {/*Mobile Sidebar */}
      <div
        className="w-64 h-screen z-40 fixed bg-slate-50 shadow-lg md:h-full flex-col justify-between md:hidden  transition duration-150 ease-in-out translate-x-[-260px]"
        id="mobile-nav"
      >
        <div
          className="h-10 w-10 bg-slate-50 absolute right-0 mt-16 -mr-10 p-1 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer"
          id="mobile-toggler"
          onClick={sidebarHandler}
        >
          <BiMenu id="openSideBar" className="text-blue-800" size={40} />
          <TiDelete
            id="closeSidebar"
            className="hidden text-blue-800"
            size={40}
          />
        </div>
        <div className="px-8 py-8 sticky top-0">
          {/* Logo */}
          <Logo />

          {/* Welcome Message */}
          <div className="flex items-center p-2 my-4 bg-blue-200 text-sm font-bold text-blue-800 border-r-4 border-blue-800 rounded shadow">
            <AiFillHeart className="mr-1" size={22} />
            <span className="w-full">
              {`Welcome, `}
              {admin && admin.name.split(" ")[0]}
              {user && user.name.split(" ")[0]}
            </span>
          </div>

          {/* Links */}
          <ul className="mt-12">
            {admin && <AdminNavLinks admin={admin} />}
            {user && <UserNavLinks user={user} />}

            {/* <div className="py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs">
      5
    </div> */}
          </ul>
        </div>
      </div>

      {/* Sidebar ends */}
    </>
  );
};
