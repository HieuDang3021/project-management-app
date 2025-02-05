import Modal from "@/components/Modal";
import { Priority, Status, useCreateTaskMutation } from "@/state/api";
import React, { useState } from "react";
import { formatISO } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id?: string | null;
  currentStatus?: Status;
};

const ModalNewTask = ({
  isOpen,
  onClose,
  id = null,
  currentStatus = Status.ToDo,
}: Props) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(currentStatus);
  const [priority, setPriority] = useState<Priority>(Priority.Backlog);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [projectId, setProjectId] = useState("");

  const handleSubmit = async () => {
    if (!title || !authorUserId || !(id !== null || projectId)) return;

    const formatStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formatDueDate = formatISO(new Date(dueDate), {
      representation: "complete",
    });

    await createTask({
      projectId: id !== null ? Number(id) : Number(projectId),
      title,
      description,
      status,
      priority,
      tags,
      startDate: formatStartDate,
      dueDate: formatDueDate,
      authorUserId: parseInt(authorUserId),
      assignedUserId: parseInt(assignedUserId),
    });
  };

  const isFormValid = () => {
    return title && authorUserId && !(id !== null || projectId);
  };

  const selectStyle =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-bg-3 dark:bg-dark-bg-3 dark:text-white dark:focus:outline-none";

  const inputStyle =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-bg-3 dark:bg-dark-bg-3 dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyle}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={inputStyle}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            className={selectStyle + `${status ? "" : "text-gray-400"}`}
            value={status}
            onChange={(e) =>
              setStatus(Status[e.target.value as keyof typeof Status])
            }
          >
            <option value="">Select Status ...</option>
            <option value={Status.ToDo}>{Status.ToDo}</option>
            <option value={Status.WorkInProgress}>
              {Status.WorkInProgress}
            </option>
            <option value={Status.Review}>{Status.Review}</option>
            <option value={Status.Completed}>{Status.Completed}</option>
          </select>
          <select
            className={selectStyle}
            value={priority}
            onChange={(e) =>
              setPriority(Priority[e.target.value as keyof typeof Priority])
            }
          >
            <option value="">Select Priority</option>
            <option value={Priority.Urgent}>{Priority.Urgent}</option>
            <option value={Priority.High}>{Priority.High}</option>
            <option value={Priority.Medium}>{Priority.Medium}</option>
            <option value={Priority.Low}>{Priority.Low}</option>
            <option value={Priority.Backlog}>{Priority.Backlog}</option>
          </select>
        </div>
        <input
          type="text"
          className={inputStyle}
          placeholder="Tags (separate by comma)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyle}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={inputStyle}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <input
          type="text"
          className={inputStyle}
          placeholder="Author User ID"
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
        />
        <input
          type="text"
          className={inputStyle}
          placeholder="Assigned User ID"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        />
        {id === null && (
          <input
            type="text"
            className={inputStyle}
            placeholder="Project ID"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        )}
        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;
