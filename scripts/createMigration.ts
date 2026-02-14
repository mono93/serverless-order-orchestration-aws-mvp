import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const convertToSnakeCase = (input: string): string => {
  return input
    .trim()
    .replaceAll(/[^\w\s-]/g, "") // Remove special characters except spaces and hyphens])
    .replaceAll(/[/\\]/g, "_") // Replace slashes with underscores
    .replaceAll(/([a-z])([A-Z])/g, "$1_$2") // Add underscore between camelCase words
    .replaceAll(/[\s-]+/g, "_") // Replace spaces and hyphens with underscores
    .toLowerCase();
};

const usage = () =>
  console.error(
    [
      "Usage:",
      "  npm run create-migration <migration-name>",
      "",
      "Example:",
      '  npm run create-migration "Add users table"',
      "",
      "Notes:",
      "  - Generates <EPCON>_<migration-name>.up.sql & <EPCON>_<migration-name>.down.sql  in snake_case format.",
      "  - Default directory: database/migrations/",
    ].join("\n"),
  );

const main = async () => {
  const [, , rawName] = process.argv;

  if (!rawName) {
    usage();
    process.exit(1);
  }

  const migrationName = convertToSnakeCase(rawName);
  if (!migrationName || migrationName === "_" || migrationName.length < 3) {
    console.error(
      "Error: Migration name is to short or inavlid post normalization",
    );
    process.exit(1);
  }

  const directory = path.join(process.cwd(), "database", "migrations");
  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }

  const epochTime = Math.floor(Date.now() / 1000);
  const baseFileName = `${epochTime}_${migrationName}`;
  const upFilePath = path.join(directory, `${baseFileName}.up.sql`);
  const downFilePath = path.join(directory, `${baseFileName}.down.sql`);

  if (existsSync(upFilePath) || existsSync(downFilePath)) {
    console.error(
      "Error: Migration files already exist. Please choose a different name or check the existing files.",
    );
    process.exit(1);
  }

  const upTemplate = `-- Migration: ${rawName}\n-- Created at: ${new Date().toISOString()}\n\n-- Write your SQL statements for applying the migration here\n`;
  const downTemplate = `-- Migration: ${rawName}\n-- Created at: ${new Date().toISOString()}\n\n-- Write your SQL statements for reverting the migration here\n`;

  writeFileSync(upFilePath, upTemplate, { encoding: "utf-8" });
  writeFileSync(downFilePath, downTemplate, { encoding: "utf-8" });

  console.log(`Migration files created successfully:`);
  console.log(`- ${path.relative(process.cwd(), upFilePath)}`);
  console.log(`- ${path.relative(process.cwd(), downFilePath)}`);
};

try {
  await main();
} catch (error) {
  console.error("An error occurred while creating migration files:", error);
  process.exit(1);
}
