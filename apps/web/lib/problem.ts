import fs from 'fs';

type SUPPORTED_LANGS = "js" | "cpp" | "rs";

interface Problem  {
    id: string,
    fullBoilerPlate: string,
    inputs: string[],
    outputs: string[]
}
 const MOUNT_FILE =  "/home/ubuntu/code-plus/apps/plroblems"
export const getProblem = async(
    problemId: string,
    languageId:SUPPORTED_LANGS
): Promise<Problem>=> {
    const fullBoilerPlate = await getFullBoilerPlate(
        problemId,
        languageId
    )
    const inputs = await getProblemInputs(problemId)
    const outputs = await getProblemOutputs(problemId)

    return {
        id: problemId,
        fullBoilerPlate: fullBoilerPlate,
        inputs: inputs,
        outputs: outputs,
    }
}

const getFullBoilerPlate = async(
    problemId: string,
    languageId:SUPPORTED_LANGS
): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(
            `${MOUNT_FILE}/${problemId}/boilerplate-full/function.${languageId}`,
            { encoding: "utf-8" },
            (err, data) => {
                if(err) {
                    reject(err)
                }
                resolve(data)
            }
        )

    })
}

async function getProblemInputs(problemId: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(
            `${MOUNT_FILE}/${problemId}/tests/inputs`,
            async (err, files) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    try {
                        const data = await Promise.all(
                            files.map((file) => {
                                return new Promise<string>((resolve, reject) => {
                                    fs.readFile(
                                        `${MOUNT_FILE}/${problemId}/tests/inputs/${file}`,
                                        { encoding: "utf-8" },
                                        (err, data) => {
                                            if (err) {
                                                reject(err);
                                            } else {
                                                resolve(data);
                                            }
                                        }
                                    );
                                });
                            })
                        );
                        resolve(data);
                    } catch (e) {
                        reject(e);
                    }
                }
            }
        );
    });
}


async function getProblemOutputs(problemId: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(
            `${MOUNT_FILE}/${problemId}/tests/outputs`,
            async (error, files) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    try {
                        const data = await Promise.all(
                            files.map((file) => {
                                return new Promise<string>((resolve, reject) => {
                                    fs.readFile(
                                        `${MOUNT_FILE}/${problemId}/tests/outputs/${file}`,
                                        { encoding: "utf-8" },
                                        (err, data) => {
                                            if (err) {
                                                reject(err);
                                            } else {
                                                resolve(data);
                                            }
                                        }
                                    );
                                });
                            })
                        );
                        resolve(data);
                    } catch (e) {
                        reject(e);
                    }
                }
            }
        );
    });
}