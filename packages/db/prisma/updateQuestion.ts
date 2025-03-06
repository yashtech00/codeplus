import { error } from "console";
import fs from "fs";
import { prismaClient } from "../src";
import { object } from "zod";
import { LANGUAGE_MAPPING } from "../../common/language";

const MOUNT_PATH = process.env.MOUNT_FILE || "../../app/problems";
function promisifedReadFile(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (error, data) => {
      if (error) {
        reject(data);
      } else {
        resolve(data);
      }
    });
  });
}

async function main(problemSlug: string) {
  const problemStatement = await promisifedReadFile(
    `${MOUNT_PATH}/${problemSlug}/problem.md`
  );

  const problem = await prismaClient.problem.upsert({
    where: {
      slug: problemSlug,
    },
    create: {
      title: problemSlug,
      slug: problemSlug,
      description: problemStatement,
    },
    update: {
      description: problemStatement,
    },
  });

  await Promise.all(
    Object.keys(LANGUAGE_MAPPING).map(async (language) => {
      const code = await promisifedReadFile(
        `${MOUNT_PATH}/${problemSlug}/boilerPlate/function.${language}`
      );
      await prismaClient.defaultCode.upsert({
        where: {
          problemId_languageId: {
            problemId: problem.id,
            languageId: LANGUAGE_MAPPING[language].internal,
          },
        },
        create: {
          problemId: problem.id,
          languageId: LANGUAGE_MAPPING[language].internal,
          code,
        },
        update: {
          code,
        },
      });
    })
  );
}

main(process.env.problemSlug!);
