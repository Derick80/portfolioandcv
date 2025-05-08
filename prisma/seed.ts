import { cvData } from "@/lib/cv_data";
import prisma from "@/lib/prisma";
import { aiStatment } from "@/lib/types";

async function seedCV() {
  const cv = await prisma.cv.create({
    data: {
      name: cvData.name,
      address: cvData.address,
      email: cvData.email,
      phone: cvData.phone,
      blurb: cvData.blurb,
      skills: {
        create: cvData.skills.map((skill) => ({
          title: skill.title,
          category: skill.category,
        })),
      },
      publications: {
        create: cvData.publications.map((publication) => ({
          title: publication.title,
          journal: publication.journal,
          publicationDate: publication.publicationDate
            ? new Date(publication.publicationDate)
            : new Date(),
          journalInfo: publication.journalInfo,
          doi: publication.doi,
          pmid: publication.pmid,
          authors: publication.authors,
        })),
      },
      conferences:{
        create: cvData.conferences.map((conference) => ({
          title: conference.title,
          conference: conference.conference,
          authors: conference.authors,
        })),
      }
    },
  });

  if (!cv) {
    console.error("Failed to seed CV for user");
    return;
  }

  console.log("CV seeded for user");

  // Seed education data and associate with CV and create education duties
  for (const education of cvData.education) {
    const newEducation = await prisma.education.create({
      data: {
        cvId: cv.id,
        school: education.school,
        degree: education.degree,
        startDate: new Date(education.startDate).toISOString(),

        endDate: new Date(education.endDate).toISOString(),

        description: education.description,
      },
    });

    if (!newEducation) {
      console.error("Failed to seed education for CV", cv.id);
      return;
    }

    console.log("Education seeded for CV", cv.id);

    for (const duty of education.duties) {
      const newDuty = await prisma.duty.create({
        data: {
          educationId: newEducation.id,
          title: duty.title,
          order: duty.order,
        },
      });

      if (!newDuty) {
        console.error("Failed to seed duty for education", newEducation.id);
        return;
      }

      console.log("Duty seeded for education", newEducation.id);
    }
  }

  // Seed experience data and associate with CV and create experience duties
  for (const experience of cvData.experience) {
    const newExperience = await prisma.experience.create({
      data: {
        cvId: cv.id,
        company: experience.company,
        position: experience.position,
        location: experience.location,
        // change dates to iso format
        startDate: new Date(experience.startDate).toISOString(),
        endDate: new Date(experience.endDate).toISOString(),

        isCurrent: false,
      },
    });

    if (!newExperience) {
      console.error("Failed to seed experience for CV", cv.id);
      return;
    }

    console.log("Experience seeded for CV", cv.id);

    for (const duty of experience.duties) {
      const newDuty = await prisma.duty.create({
        data: {
          experienceId: newExperience.id,
          title: duty.title,
          order: duty.order,
        },
      });

      if (!newDuty) {
        console.error("Failed to seed duty for experience", newExperience.id);
        return;
      }
    }

    console.log("Duty seeded for experience", newExperience.id);
  }
}

async function main() {
  console.log("Deleting all records...");

  await prisma.$transaction([
    prisma.cv.deleteMany(),
    prisma.education.deleteMany(),
    prisma.experience.deleteMany(),
    prisma.duty.deleteMany(),
    prisma.publication.deleteMany(),
    prisma.skill.deleteMany(),
    prisma.aiStatement.deleteMany(),
  ]);

  console.log("All tables cleared!");

  await seedCV();
  console.log("CV seeded");
  await prisma.aiStatement.create({
    data: {
      statement: aiStatment,
    },
  });
  console.log("AI Statement seeded");
  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
