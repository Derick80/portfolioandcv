"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { ArkhamInvestigatorCard } from "@/local_resources/arkham-types";
import { on } from "events";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllInvestigators } from "../actions/arkham-actions";
import { set } from "zod";

type InvestigatorSelectProps = {
  onSelect: (selectedInvestigator: ArkhamInvestigatorCard | null) => void;
};

const InvestigatorSelect = ({ onSelect }: InvestigatorSelectProps) => {
  const [data, setData] = useState<ArkhamInvestigatorCard[]>([]);

  useEffect(() => {
    async function fetchInvestigators() {
      const data = await getAllInvestigators();
      if (!data) {
        console.error("No investigators found");
        return;
      }
      setData(data);
      setAllInvestigators(data);
    }
    fetchInvestigators();
  }, []);
  const [allInvestigators, setAllInvestigators] =
    useState<ArkhamInvestigatorCard[]>(data);
  const [selectedInvestigator, setSelectedInvestigator] = useState<
    string | null
  >(null);
  console.log("Selected Investigator:", allInvestigators);
  return (
    <div>
      <Select
        onValueChange={(value) => {
          setSelectedInvestigator(value);
          onSelect(data.find((inv) => inv.code === value) || null);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Investigator" />
        </SelectTrigger>
        <SelectContent>
          {allInvestigators?.map((investigator) => (
            <SelectItem key={investigator.code} value={investigator.code}>
              {investigator.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default InvestigatorSelect;
