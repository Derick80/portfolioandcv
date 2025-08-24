import { getAllInvestigators } from "../actions/arkham-actions";
import { ArkhamInvestigatorCard } from "@/local_resources/arkham-types";
import ArkhamTracker from "./arkham-tracker";

export default async function Page() {
  // const allInvestigators = await getAllInvestigators();
  // use above in production eventually -- calling the live API!
  // for now let's use a json object I copied directly from the API response.
  const data = await getAllInvestigators();
  if (!data || data.length === 0) {
    return <div>No investigators found.</div>;
  }
  const allInvestigators: ArkhamInvestigatorCard[] = data;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-1">
      <ArkhamTracker investigators={allInvestigators} />
    </div>
  );
}
