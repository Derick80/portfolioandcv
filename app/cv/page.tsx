import { getCV } from "../actions/curriculum-vitae";
import CVDisplay from "./cv-display";
import type { Metadata, ResolvingMetadata } from "next";
import { unstable_ViewTransition as ViewTransition } from "react";
// Generate dynamic metadata based on CV data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // Fetch CV data
  const cvData = await getCV();
  // Get parent metadata (optional)
  const previousImages = (await parent).openGraph?.images || [];

  // Format name properly
  const name =
    cvData?.name === "first_cv" ? "Derick Hoskinson, Ph.D." : cvData?.name;

  // Create skills list for keywords
  const skills = cvData?.skills.map((skill) => skill.title).join(", ");

  // Create a brief description from the blurb and skills
  const description = `${cvData?.blurb} Expertise in: ${skills}`;

  return {
    title: `${name} | Curriculum Vitae`,
    description,
    keywords: [
      "curriculum vitae",
      "resume",
      ...(cvData?.skills?.map((skill) => skill?.title) || []),
      "clinical scientist",
      "genetics",
      "bioinformatics",
    ],
    authors: [{ name }],
  };
}
export default async function CVPage() {
  const cv = await getCV();
  if (!cv) return null;

  // Convert Date properties to strings

  return (
   <div>
        <CVDisplay cvData={cv} />
   </div>
    
  );
}
