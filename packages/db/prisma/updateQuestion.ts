
import { error } from 'console'
import fs from 'fs'




const MOUNT_PATH = process.env.MOUNT_FILE || "../../app/problems"
function promisifedReadFile(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", (error, data) => {
            if (error) {
                reject(data);
            }
            else {
                resolve(data);
            }
        })
    })
}

async function main(problemSlug:string) {
    const problemStatement = await promisifedReadFile(
        `${MOUNT_PATH}/${problemSlug}/problem.md`
    )

    const problem = await 
}

main();