import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

exports.getTeamsWithUserName = async (req: Request, res: Response): Promise<void> => {

  try {
    const teams = await prisma.team.findMany();

    const teamsWithUsernames = await Promise.all(
      teams.map(async (team: any) => {
        const productOwner = await prisma.user.findUnique({
          where: { id: team.productOwnerUserId! },
          select: {username: true},
        });

        const projectManager = await prisma.user.findUnique({
          where: { id: team.projectManagerUserId! },
          select: {username: true},
        });

        return {
          ...team,
          productOwnerUsername: productOwner?.username,
          projectManagerUsername: projectManager?.username,
        }
      })
    )
     
    res.status(200).json(teamsWithUsernames);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Error retrieving teams", error: error.message });
    } else {
      res.status(500).json({ message: "Error retrieving teams", error: String(error) });
    }
    console.error(error);
  }
};