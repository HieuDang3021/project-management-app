"use client";

import React from "react";

import ProjectHeader from "../ProjectHeader";

type Props = {
  params: Promise<{ id: string }>;
};

const Project = ({ params }: Props) => {
  const { id } = params;
  const [activeTab, setActiveTab] = React.useState("Board");
  // const [isModalNewTaskOpen, setIsModalNewTaskOpen] = React.useState(false);

  return (
    <div>
      {/* MODAL NEW TASKS */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* {activeTab === "Board" && <h1>Board</h1>} */}
    </div>
  );
};

export default Project;
