import {prisma} from "@/prisma";

export const getCV = async () => {
  const cv = await prisma.cv.findFirst({
    include: {
      education: {
        include: {
          duties: true,
        },
      },
      experience: {
        include: {
          duties: true,
        },
      },
      publications: true,
      skills: true,
      conferences: true,
    },
  });

  return cv;
};
