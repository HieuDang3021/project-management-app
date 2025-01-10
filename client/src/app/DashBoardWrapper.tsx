"use client"
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import StoreProvider, { useAppSelector } from "./redux";

const DashBoardLayout = ({ children }: { children?: React.ReactNode }) => {
  const isSideBarOpen = useAppSelector((state) => state.global.isSideBarOpen);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-full w-full bg-gray-50 text-gray-900">
      <Sidebar/>
      <main className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${ isSideBarOpen ? 'md:pl-64' : ''}`} >
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
