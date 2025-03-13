import fs from "fs";  
import { prismaClient } from "../src";  
import { LANGUAGE_MAPPING } from "../../common/language";  

const MOUNT_PATH = process.env.MOUNT_FILE || "../../apps/problems";  

function promisifedReadFile(path: string): Promise<string> {  
  return new Promise((resolve, reject) => {  
    fs.readFile(path, "utf8", (error, data) => {  
      if (error) {  
        reject(error); // Reject with the error object  
      } else {  
        resolve(data);  
      }  
    });  
  });  
}  

async function main(problemSlug: string) {  
  try {  
    const problemStatement = await promisifedReadFile(  
      `${MOUNT_PATH}/${problemSlug}/problem.md`  
    );
    
    const problemDetail = await promisifedReadFile(
      `${MOUNT_PATH}/${problemSlug}/Detail.md`
    )
    console.log(problemDetail,"yash problemdetail");
    

    const problem = await prismaClient.problem.upsert({  
      where: {  
        slug: problemSlug,  
      },  
      create: {  
        title: problemSlug,  
        slug: problemSlug,  
        description: problemStatement,  
        companyName: problemDetail, // Add the required companyName property  
      },  
      update: {  
        description: problemStatement,
        companyName:problemDetail
      },  
    });  
    console.log(problem,"yash update problem");
    
    // Handle all language boilerplate code reading and upserting  
    await Promise.all(  
      Object.keys(LANGUAGE_MAPPING).map(async (language) => {  
        try {  
          const code = await promisifedReadFile(  
            `${MOUNT_PATH}/${problemSlug}/boilerPlate/function.${language}`  
          );  

          const languageId = LANGUAGE_MAPPING[language].internal; // Obtain the internal ID  

          // Check if the languageId exists in the database  
          const languageExists = await prismaClient.language.findUnique({  
            where: { id: languageId },  
          });  
    
          // If the language ID does not exist, log an error and skip  
          if (!languageExists) {  
            console.error(`Language ID ${languageId} (${LANGUAGE_MAPPING[language].name}) does not exist in the Language table.`);  
            return; // Skip the upsert if the language doesn't exist  
          }  
    

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
        } catch (readError) {  
          console.error(`Error reading file for language ${language}:`, readError);  
        }  
      })  
    );  
  } catch (error) {  
    console.error(`Error processing problem slug "${problemSlug}":`, error);  
    process.exit(1); // Exit if there’s an error  
  }  
}  

// Ensure the environment variable is set  
const problemSlug = process.env.PROBLEM_SLUG; // Ensure casing is correct  
if (!problemSlug) {  
  console.error("PROBLEM_SLUG environment variable is not set.");  
  process.exit(1);  
}  

// Call main with proper error handling  
main(problemSlug).catch((error) => {  
  console.error("Unhandled error in main function:", error);  
  process.exit(1);  
});  