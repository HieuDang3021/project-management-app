"use client";

import React from "react";

import ProjectHeader from "../ProjectHeader";
import BoardView from "../BoardView";
import ListView from "../ListView";
import TimelineView from "../TimelineView";
import TableView from "../TableView";
import ModalNewTask from "@/components/ModalNewTask";
import { Status } from "@/state/api";

type Props = {
  params: Promise<{ id: string }>;
};

const Project = ({ params }: Props) => {
  const [id, setId] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = React.useState(false);
  const [currentStatus, setCurrentStatus] = React.useState<Status>(Status.ToDo);

  React.useEffect(() => {
    // Unwrap the `params` Promise
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  if (!id) {
    return <div>Loading...</div>; // Render a loading state while `params` is being resolved
  }

  return (
    <div>
      {/* MODAL NEW TASKS */}
      {isModalNewTaskOpen && (
        <ModalNewTask
          isOpen={isModalNewTaskOpen}
          onClose={() => setIsModalNewTaskOpen(false)}
          id={id}
          currentStatus={currentStatus}
        />
      )}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <BoardView
          id={id}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          setCurrentStatus={setCurrentStatus}
        />
      )}
      {activeTab === "List" && (
        <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <TimelineView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Table" && (
        <TableView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default Project;
