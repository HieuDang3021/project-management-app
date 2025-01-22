import Header from "@/components/Header";
import { Clock, Filter, Grid3X3, List, Share, Table } from "lucide-react";
import React from "react";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = React.useState(false);

  return (
    <div className="px-4 xl:px-6">
      {/* MODAL NEW PROJECT */}
      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
        <Header name="Project details" />
      </div>

      {/* TABS */}
      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            icon={<Grid3X3 className="size-5" />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="List"
            icon={<List className="size-5" />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="Timeline"
            icon={<Clock className="size-5" />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="Table"
            icon={<Table className="size-5" />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Filter className="size-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Share className="size-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search tasks"
              className="rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:border-dark-bg-2 dark:bg-dark-bg-2 dark:text-gray-200"
            />
            <Grid3X3 className="absolute left-3 top-2 size-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tab: string) => void;
  activeTab: string;
};

const TabButton = ({ name, icon, activeTab, setActiveTab }: TabButtonProps) => {
  const isActive = activeTab === name;

  return (
    <button
      className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600 dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4 ${isActive ? "text-blue-600 after:bg-blue-600 dark:text-white" : ""}`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      <span>{name}</span>
    </button>
  );
};

export default ProjectHeader;
