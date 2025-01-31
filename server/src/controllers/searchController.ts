import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

exports.search = async (req: Request, res: Response): Promise<void> => {
  const { query } = req.query;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { title: { contains: query as string, mode: "insensitive" } },
          { description: { contains: query as string, mode: "insensitive" } },
        ]
      }
    });
    
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { name: { contains: query as string, mode: "insensitive" } },
          { description: { contains: query as string, mode: "insensitive" } },
        ]
      }
    });

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: query as string, mode: "insensitive" } },
        ],
      }
    });

    res.status(200).json({ tasks, projects, users });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Error performing search", error: error.message });
    } else {
      res.status(500).json({ message: "Error performing search", error: String(error) });
    }
    console.error(error);
  }
};