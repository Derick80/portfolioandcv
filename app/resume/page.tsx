import ResumeBuilder from "./resume-builder";

export default async function Page() {
  return (
    <div className="flex flex-col items-center  h-screen">
      <h1 className="text-4xl font-bold">Resume</h1>
      <p className="mt-4 text-lg">This is my resume page.</p>

      <ResumeBuilder />
    </div>
  );
}
