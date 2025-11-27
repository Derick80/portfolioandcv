// prisma/seed-categories.ts

import prisma from "@/prisma";


async function main() {
  // 1. Seed Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: "General" },
      update: {},
      create: { name: "General" },
    }),
    prisma.category.upsert({
      where: { name: "Variant Interpretation and Classification" },
      update: {},
      create: { name: "Variant Interpretation and Classification" },
    }),
    prisma.category.upsert({
      where: { name: "Bioinformatics" },
      update: {},
      create: { name: "Bioinformatics" },
    }),
    prisma.category.upsert({
      where: { name: "Off-topic" },
      update: {},
      create: { name: "Off-topic" },
    }),
  ]);



  // 2. Ensure at least one test user exists (needed for thread author)
  const testUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Forum Admin",
    },
  });

  // 3. Seed Example Threads
  const starterThreads = [
    {
      title: "Welcome to the Genetics Forum!",
      content:
        "Introduce yourself here and let us know what areas of genetics or cancer biology interest you most.",
      categoryId: categories[0].id, // General
    },
    {
      title: "Best practices for ACMG/AMP classification",
      content:
        "How do you approach borderline cases? Share your workflows, heuristics, and papers.",
      categoryId: categories[1].id, // Variant Interpretation
    },
    {
      title: "Favorite bioinformatics pipelines for cancer genomics?",
      content:
        "What’s your go-to pipeline for WGS/Panel analysis? Let’s compare notes!",
      categoryId: categories[2].id, // Bioinformatics
    },
    {
      title: "Off-topic: What are you reading right now?",
      content:
        "Science or non-science, let’s hear your recommendations!",
      categoryId: categories[3].id, // Off-topic
    },
  ];
for (const thread of starterThreads) {
  await prisma.thread.create({
    data: {
      title: thread.title,
      content: thread.content,
      categoryId: thread.categoryId,
      authorId: testUser.id,
    },
  });
}


  console.log("✅ Categories and starter threads seeded");

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
