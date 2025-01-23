import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export enum Status {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  Review = "Under Review",
  Completed = "Completed",
}

export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  DueDate?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId?: string;
  teamId?: number;
}

export interface Attachment {
  id: number;
  fileURL: string;
  fileName: string;
  caption?: string;
  taskId: number;
  uploadedById: number;
}

export interface Comment {
  id: number;
  text: string;
  createdAt: string;
  taskId: number;
  userId: number;
}

export interface Task {
  id: number;
  title: string;
  projectId: string;
  authorUserId: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  points?: number;
  startDate?: string;
  dueDate?: string;
  description?: string;
  assignedUserId?: number;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks"],
  endpoints: (build) => ({
    // Project endpoints
    getProjects: build.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),
    createProject: build.mutation<Project, Partial<Project>>({
      query: (body) => ({
        url: "projects/new",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Projects"],
    }),
    //task endpoints
    getTasks: build.query<Task[], string>({
      query: (projectId) => `tasks/${projectId}`,
      providesTags: (result) => 
        result 
          ? result.map(({ id }) => ({ type: "Tasks" as const, id })) 
          : [{ type: "Tasks" as const }],
    }),
    createTask: build.mutation<Task, Partial<Task>>({
      query: (body) => ({
        url: "tasks/new",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTaskStatus: build.mutation<Task, { id: number; status: Status }>({
      query: ({ id, status }) => ({
        url: `tasks/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Tasks", id }],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
} = api;