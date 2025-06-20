import React from "react";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";

import { Task, useGetTasksQuery } from "@/state/api";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ListView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const { data: tasks, error, isLoading } = useGetTasksQuery(Number(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>An error occurred while fetching task</div>;
  }

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header name="List" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default ListView;
