import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { project_id } = req.params;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(project_id)
      },
      include: {
        author: { select: { id: true, username: true } },
        assignee: { select: { id: true, username: true } },
        attachment: true,
        comment: true
      }
    });
    res.status(200).json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Error retrieving tasks", error: error.message });
    } else {
      res.status(500).json({ message: "Error retrieving tasks", error: String(error) });
    }
    console.error(error);
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { 
    title, 
    projectId, 
    authorUserId, 
    status,
    priority,
    tags,
    startDate,
    dueDate,
    description, 
    assignedUserId,
  } = req.body;

  // Validate all required fields
  if (
    !projectId || !title || !authorUserId ||
    title.trim() === '' || 
    authorUserId.trim() === '' ||
    projectId.trim() === ''
  ) {
    res.status(400).json({ message: "Please provide all required fields: projectId, title, authorUserId!" });
    return;
  }

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        authorUserId: Number(authorUserId),
        projectId: Number(projectId),
        ...(status && status.trim() !== '' && { status }),
        ...(priority && priority.trim() !== '' && { priority }),
        ...(tags && tags.trim() !== '' && { tags }),
        ...(startDate && startDate.trim() !== '' && { startDate }),
        ...(dueDate && dueDate.trim() !== '' && { dueDate }),
        ...(description && description.trim() !== '' && { description }),
        ...(assignedUserId && assignedUserId.trim() !== '' && { assignedUserId }),
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({ message: error.message });
    } else if (error instanceof Error) {
      res.status(500).json({ message: "Error creating task", error: error.message });
    } else {
      res.status(500).json({ message: "Error creating task", error: String(error) });
    }
    console.error(error);
  }
};

export const updateTaskStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { status },
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({ message: error.message });
    } else if (error instanceof Error) {
      res.status(500).json({ message: "Error updating task status", error: error.message });
    } else {
      res.status(500).json({ message: "Error updating task status", error: String(error) });
    }
    console.error(error);
  }
};