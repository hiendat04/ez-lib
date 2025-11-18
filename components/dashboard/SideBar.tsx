"use client";
import { useAuth } from "@/context/authContext";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const SideBar = () => {
  const [selected, setSelected] = useState("dashboard");
  const { logout } = useAuth();

  return (
    <nav className="bg-primary fixed top-0 left-0 z-30 flex h-full w-64 flex-col p-4 text-white">
      <div className="mr-6 mb-6 ml-2 flex items-center gap-2">
        <LocalLibraryIcon className="text-accent" style={{ fontSize: 40 }} />
        <h1 className="text-2xl font-medium text-white">Ez Lib</h1>
      </div>

      <hr className="mb-8 border-gray-300" />

      <div className="ml-2 flex flex-col gap-6">
        <Link
          href="/dashboard"
          className={clsx(
            "cursor-pointer rounded-md border-l-4 p-2",
            "hover:border-accent hover:bg-[#234A5E]",
            {
              "border-accent bg-[#234A5E]": selected === "dashboard",
              "border-transparent": selected !== "dashboard",
            },
          )}
          onClick={() => setSelected("dashboard")}
        >
          <DashboardCustomizeOutlinedIcon className="mr-3" /> Dashboard
        </Link>
        <Link
          href="/dashboard/books"
          className={clsx(
            "cursor-pointer rounded-md border-l-4 p-2",
            "hover:border-accent hover:bg-[#234A5E]",
            {
              "border-accent bg-[#234A5E]": selected === "books",
              "border-transparent": selected !== "books",
            },
          )}
          onClick={() => setSelected("books")}
        >
          <AutoStoriesOutlinedIcon className="mr-3" /> Books
        </Link>
        <Link
          href="/dashboard/loans"
          className={clsx(
            "cursor-pointer rounded-md border-l-4 p-2",
            "hover:border-accent hover:bg-[#234A5E]",
            {
              "border-accent bg-[#234A5E]": selected === "loans",
              "border-transparent": selected !== "loans",
            },
          )}
          onClick={() => setSelected("loans")}
        >
          <UpdateOutlinedIcon className="mr-3" /> My Loans
        </Link>
      </div>

      <div className="flex-1"></div>

      <button
        onClick={logout}
        className="bg-primary/10 mb-10 ml-2 flex cursor-pointer items-center"
      >
        <LogoutOutlinedIcon className="mr-3" /> Logout
      </button>
    </nav>
  );
};

export default SideBar;
