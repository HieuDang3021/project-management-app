import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

async function deleteAllData(orderedFileNames: string[]) {
  const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  }).reverse();

  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];
    try {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } catch (error) {
      console.error(`Error clearing data from ${modelName}:`, error);
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  const orderedFileNames = [
    "team.json",
    "project.json",
    "projectTeam.json",
    "user.json",
    "task.json",
    "attachment.json",
    "comment.json",
    "taskAssignment.json",
  ];

  await deleteAllData(orderedFileNames);

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];


    try {
      console.log('resetting sequence for', modelName);
      // Dynamically fetch sequence name
      const tableName = `"${modelName.charAt(0).toUpperCase()}${modelName.slice(1)}"`; // Assuming the table name matches the model name in lowercase
      const result = await prisma.$queryRawUnsafe<{ sequence_name: string }[]>(`
        SELECT pg_get_serial_sequence('${tableName}', 'id') AS sequence_name;
      `);

      // Check if the result has a valid sequence name
      const sequenceName = result?.[0]?.sequence_name;
      if (sequenceName) {
        await prisma.$executeRawUnsafe(`
          ALTER SEQUENCE ${sequenceName} RESTART WITH 1;
        `);
        console.log(`Sequence for ${sequenceName} reset to 1.`);
      } else {
        console.warn(`No sequence found for table ${tableName}.`);
      }

      for (const data of jsonData) {
        await model.create({ data });
      }
      console.log(`Seeded ${modelName} with data from ${fileName}`);
    } catch (error) {
      console.error(`Error seeding data for ${modelName}:`, error, '\n~~~~~~~~~~~~~~~');
    }
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());