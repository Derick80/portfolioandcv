import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

const TopTracker = () => {
  const [doom, setDoom] = React.useState(Array(20).fill(false));
  const [drawPlayerOneEncounterCard, setDrawPlayerOneEncounterCard] =
    React.useState(Array(20).fill(false));
  const [drawPlayerTwoEncounterCard, setDrawPlayerTwoEncounterCard] =
    React.useState(Array(20).fill(false));
  const [endOfMythosPhase, setEndOfMythosPhase] = React.useState(
    Array(20).fill(false),
  );

  const handleDoomChange = (index: number) => {
    setDoom((prev) => {
      const newDoom = [...prev];
      newDoom[index] = !newDoom[index];
      return newDoom;
    });
  };

  const handleDrawPlayerOneEncounterCardChange = (index: number) => {
    setDrawPlayerOneEncounterCard((prev) => {
      const newDraw = [...prev];
      newDraw[index] = !newDraw[index];
      return newDraw;
    });
  };

  const handleDrawPlayerTwoEncounterCardChange = (index: number) => {
    setDrawPlayerTwoEncounterCard((prev) => {
      const newDraw = [...prev];
      newDraw[index] = !newDraw[index];
      return newDraw;
    });
  };

  const handleEndOfMythosPhaseChange = (index: number) => {
    setEndOfMythosPhase((prev) => {
      const newEnd = [...prev];
      newEnd[index] = !newEnd[index];
      return newEnd;
    });
  };

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-blue-500">Doom:</p>
      <div className="flex flex-row flex-wrap gap-1">
        {doom.map((isChecked, index) => (
          <Checkbox
            key={index}
            checked={isChecked}
            onCheckedChange={() => handleDoomChange(index)}
            className="h-6 w-6 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-400"
          />
        ))}
      </div>
      <p className="text-blue-500">Draw Player One Encounter Card:</p>
      <div className="flex flex-wrap gap-1">
        {drawPlayerOneEncounterCard.map((isChecked, index) => (
          <Checkbox
            key={index}
            checked={isChecked}
            onCheckedChange={() =>
              handleDrawPlayerOneEncounterCardChange(index)
            }
            className="h-6 w-6 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-400"
          />
        ))}
      </div>
      <p className="text-blue-500">Draw Player Two Encounter Card:</p>
      <div className="flex flex-wrap gap-1">
        {drawPlayerTwoEncounterCard.map((isChecked, index) => (
          <Checkbox
            key={index}
            checked={isChecked}
            onCheckedChange={() =>
              handleDrawPlayerTwoEncounterCardChange(index)
            }
            className="h-6 w-6 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-400"
          />
        ))}
      </div>
      <p className="text-blue-500">Mark End of Mythos Phase:</p>
      <div className="flex flex-wrap gap-1">
        {endOfMythosPhase.map((isChecked, index) => (
          <Checkbox
            key={index}
            checked={isChecked}
            onCheckedChange={() => handleEndOfMythosPhaseChange(index)}
            className="h-6 w-6 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-400"
          />
        ))}
      </div>
    </div>
  );
};

export default TopTracker;
