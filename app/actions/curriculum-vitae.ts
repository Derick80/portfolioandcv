import prisma from "@/lib/prisma";

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
    },
  });

  return cv;
};
