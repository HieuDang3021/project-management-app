import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await prisma.project.findMany();
    res.status(200).json(projects);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Error retrieving projects", error: error.message });
    } else {
      res.status(500).json({ message: "Error retrieving projects", error: String(error) });
    }
  }
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
  const { name, description, startDate, endDate } = req.body;

  // Validate all required fields
  if (
    !name || !description || !startDate || !endDate || 
    name.trim() === '' || 
    description.trim() === '' || 
    startDate.trim() === '' || 
    endDate.trim() === ''
  ) {
    res.status(400).json({ message: "Please provide all required fields: name, description, startDate, endDate" });
    return;
  }

  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate
      },
    });
    res.status(201).json(newProject);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({ message: error.message });
    } else if (error instanceof Error) {
      res.status(500).json({ message: "Error creating project", error: error.message });
    } else {
      res.status(500).json({ message: "Error creating project", error: String(error) });
    }
    console.error(error);
  }
};