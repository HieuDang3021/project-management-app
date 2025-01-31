import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

exports.getUsers = async (req: Request, res: Response): Promise<void> => {

  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Error retrieving users", error: error.message });
    } else {
      res.status(500).json({ message: "Error retrieving users", error: String(error) });
    }
    console.error(error);
  }
};