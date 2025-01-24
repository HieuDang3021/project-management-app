import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {
  Status,
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
  Task as TaskType,
} from "@/state/api";
import { EllipsisVertical, MessageSquareMore, Plus } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const BoardView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const { data: tasks, isLoading, error } = useGetTasksQuery(id);
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const moveTask = (taskId: number, status: Status) => {
    updateTaskStatus({ id: taskId, status });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>An error occurred while fetching task</div>;
  }
  return (
    <DndProvider backend={HTML5Backend}>
      {/* Board content */}
      <div className="grid grid-cols-1 gap-4 px-5 md:grid-cols-2 xl:grid-cols-4">
        {Object.values(Status).map((status: string) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks?.filter((task) => task.status === status) || []}
            moveTask={moveTask}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
};

// TASK COLUMN ------------------------------------------------------

type TaskColumnProps = {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, status: Status) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status as Status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const tasksCount = tasks.filter((task) => task.status === status).length;

  const statusColor: { [key: string]: string } = {
    "To Do": "#2563EB",
    "Work In Progress": "#059669",
    "Under Review": "#D97706",
    Completed: "#DC2626",
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`sl:py-4 rounded-lg py-2 xl:px-2 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
    >
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 !bg-[${statusColor[status]}] rounded-s-lg`}
          style={{ backgroundColor: statusColor[status] }}
        />
        <div className="flex w-full items-center justify-between rounded-e-lg bg-gray-100 px-5 py-4 dark:bg-dark-bg-2">
          <h3 className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-100">
            {status}{" "}
            <span className="ml-3 inline-flex size-6 items-center justify-center rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-gray-600 dark:text-gray-100">
              {tasksCount}
            </span>
          </h3>
          <div className="flex items-center gap-1">
            <button
              // onClick={() => setIsModalNewTaskOpen(true)}
              className="felx h-6 w-5 items-center justify-center dark:text-neutral-500"
            >
              <EllipsisVertical size={26} />
            </button>
            <button
              className="flex size-6 items-center justify-center rounded bg-gray-200 dark:bg-gray-600 dark:text-white"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Task key={task.id} task={task} />
        ))}
    </div>
  );
};

// TASK BOX -----------------------------------------------------------
type TaskProps = {
  task: TaskType;
};

const Task = ({ task }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const taskTagsSplit = task.tags?.split(",") || [];

  const formatStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";

  const formatDueDate = task.dueDate ? format(new Date(task.dueDate), "P") : "";

  const numberOfComments = task.comments?.length || 0;

  const PriorityTag = ({ priority }: { priority: TaskType["priority"] }) => (
    <div
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        priority === "Urgent"
          ? "bg-red-200 text-red-700"
          : priority === "High"
            ? "bg-yellow-200 text-yellow-700"
            : priority === "Medium"
              ? "bg-green-200 text-green-700"
              : priority === "Low"
                ? "bg-blue-200 text-blue-700"
                : "bg-gray-200 text-gray-700"
      }`}
    >
      {priority}
    </div>
  );

  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`mb-4 rounded-md bg-white shadow dark:bg-dark-bg-2 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`/${task.attachments[0].fileURL}`}
          alt={task.attachments[0].fileName}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-md"
        />
      )}
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}
            <div className="flex gap-2">
              {taskTagsSplit.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs"
                >
                  {" "}
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <button className="flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500">
            <EllipsisVertical size={26} />
          </button>
        </div>

        <div className="my-3 flex justify-between">
          <h4 className="text-base font-bold dark:text-white">{task.title}</h4>
          {typeof task.points === "number" && (
            <div className="text-xs font-semibold dark:text-white">
              {task.points} pts
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 dark:text-neutral-500">
          {formatStartDate && <span>{formatStartDate} - </span>}
          {formatDueDate && <span>{formatDueDate}</span>}
        </div>
        <p className="text-sm text-gray-600 dark:text-neutral-500">
          {task.description}
        </p>
        <div className="mt-4 border-t border-gray-200 dark:border-gray-700" />

        {/* USERS */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-[6px] overflow-hidden">
            {task.author && (
              <Image
                key={task.author.id}
                src={`/${task.author.profilePictureUrl!}`}
                alt={task.author.username}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-bg-2"
              />
            )}
            {task.assignee && (
              <Image
                key={task.assignee.id}
                src={`/${task.assignee.profilePictureUrl!}`}
                alt={task.assignee.username}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-bg-2"
              />
            )}
          </div>
          <div className="flex items-center text-gray-500 dark:text-neutral-500">
            <MessageSquareMore size={20} />
            <span className="ml-1 text-sm dark:text-neutral-400">
              {numberOfComments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
