import prisma from ".";

export const getProblem = async (problemId: string, contestId?: string) => {
  if (contestId) {

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

  const problem = await prisma.problem.findFirst({
    where: {
      id: problemId,
    },
    include: {
      defaultCode: true,
    },
  });
  return problem;
};

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
