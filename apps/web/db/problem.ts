import prisma from ".";

export const getProblems = async () => {
    const problems = await prisma.problem.findMany({
      where: {
        hidden: false,
      },
      include: {
        defaultCode: true,
      },
    });
    return problems;
};
  
export const getProblem = async (problemId:string) => {
    const problem = await prisma.problem.findFirst({
        where: {
          id: problemId,
        },
        include: {
          defaultCode: true,
        },
      });
      return problem;
    }
