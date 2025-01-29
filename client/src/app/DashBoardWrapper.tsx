"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import StoreProvider, { useAppDispatch, useAppSelector } from "./redux";
import { setIsSideBarOpen } from "@/state";

const DashBoardLayout = ({ children }: { children?: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const isSideBarOpen = useAppSelector((state) => state.global.isSideBarOpen);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const handleClickOutside = () => {
    const mediaQuery = window.matchMedia("(max-width: 768px)"); // Tailwind 'sm' breakpoint (640px)
    if (mediaQuery.matches && isSideBarOpen) {
      dispatch(setIsSideBarOpen(false));
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-full w-full bg-gray-50 text-gray-900">
      <Sidebar />
      <main
        className={`after:contents-[""] flex w-full flex-col bg-gray-50 after:absolute after:inset-0 after:z-10 after:bg-gray-900 after:transition-opacity after:duration-[0.7s] dark:bg-dark-bg md:after:content-none ${isSideBarOpen ? "after:opacity-50 md:pl-64" : "after:pointer-events-none after:opacity-0"}`}
        onClick={() => handleClickOutside()}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashBoardWrapper = ({ children }: { children?: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashBoardLayout>{children}</DashBoardLayout>
    </StoreProvider>
  );
};

export default DashBoardWrapper;
