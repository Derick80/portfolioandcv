import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArkhamInvestigatorCard } from "@/local_resources/arkham-types";
import {
  MinusIcon,
  PlusIcon,

  RefreshCw,
} from "lucide-react";
import Image from "next/image";
import React from "react";

type PlayerTrackerProps = {
  investigator: ArkhamInvestigatorCard;
};

const PlayerTracker = ({ investigator }: PlayerTrackerProps) => {
  const [checks, setChecks] = React.useState(Array(5).fill(false));

  const [resources, setResources] = React.useState(5);
  const [health, setHealth] = React.useState(investigator.health);
  const [sanity, setSanity] = React.useState(investigator.sanity);
  const [reaction, setReaction] = React.useState(investigator.real_text);
  const [open, setOpen] = React.useState(false);
  const handleResourceChange = (amount: number) => {
    setResources((prev) => Math.max(0, prev + amount));
  };

  const handleHealthChange = (amount: number) => {
    setHealth((prev) =>
      Math.max(0, Math.min(investigator.health, prev + amount)),
    );
  };

  const handleSanityChange = (amount: number) => {
    setSanity((prev) =>
      Math.max(0, Math.min(investigator.sanity, prev + amount)),
    );
  };

  const reactionText = reaction.split("[elder_sign]")[0]?.trim();

  const elderSignText = reaction.split("[elder_sign]")[1]?.trim();

  const handleToggle = (index: number) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];
    setChecks(newChecks);
  };

  const handleNextRound = () => {
    setChecks(Array(5).fill(false));
  };

  return (
    <Card className="w-full max-w-m p-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold">{investigator.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* I want to add a stat box taht is static and reaction and elder_sign values but I want it all to be collapisble.  */}
        <div className="border border-gray-300 rounded-lg">
          <div
            className="flex justify-between p-4 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <h3 className="font-semibold">Investigator Stats</h3>
            <span>{open ? "-" : "+"}</span>
          </div>
          {open && (
            <div className="p-4">
              <div className="flex flex-wrap w-full items-center justify-between gap-2">
                <div className="flex flex-col  justify-between">
                  <span className="flex flex-col  gap-2 font-medium text-gray-700">
                    <Image
                      src="/assets/images/Willpower02.webp"
                      alt="Willpower"
                      width={24}
                      height={24}
                      className="bg-white rounded-full"
                    />
                    Willpower
                  </span>
                  <span className="text-lg font-bold">3</span>
                </div>
                <div className="flex flex-col">
                  <span className="flex flex-col gap-2 font-medium text-gray-700">
                    <Image
                      src="/assets/images/Intellect02.webp"
                      alt="Intellect"
                      width={24}
                      height={24}
                      className="bg-white rounded-full"
                    />
                    Intellect
                  </span>
                  <span className="text-lg font-bold">4</span>
                </div>
                <div className="flex flex-col">
                  <span className="flex flex-col gap-2 font-medium text-gray-700">
                    <Image
                      src="/assets/images/Combat02.webp"
                      alt="Combat"
                      width={24}
                      height={24}
                      className="bg-white rounded-full"
                    />
                    Combat
                  </span>
                  <span className="text-lg font-bold">5</span>
                </div>
                <div className="flex flex-col">
                  <span className="flex flex-col gap-2 font-medium text-gray-700">
                    <Image
                      src="/assets/images/Agility02.webp"
                      alt="Agility"
                      width={24}
                      height={24}
                      className="bg-white rounded-full"
                    />
                    Agility
                  </span>
                  <span className="text-lg font-bold">2</span>
                </div>
              </div>
              {/* Need to put in reaction and elder sign effect */}
              <div className="flex  gap-2">
                <p>{reactionText}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Image
                  src="/assets/images/ElderSign02.webp"
                  alt="Elder Sign"
                  width={24}
                  height={24}
                  className="bg-white rounded-full"
                />
                {elderSignText}
              </div>
            </div>
          )}
        </div>

        {/* Health Tracker */}
        <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center space-x-2">
            <Image
              src="/assets/images/Health.webp"
              alt="Health"
              width={24}
              height={24}
              className=" rounded-full"
            />
            <span className="font-medium text-red-700 dark:text-red-300">
              Health
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleHealthChange(-1)}
              disabled={health <= 0}
              className="h-8 w-8 p-0 border-red-300 hover:bg-red-100 dark:hover:bg-red-900/30"
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
            <span className="text-lg font-bold min-w-[3rem] text-center text-red-700 dark:text-red-300">
              {health}/{investigator.health}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleHealthChange(1)}
              disabled={health >= investigator.health}
              className="h-8 w-8 p-0 border-red-300 hover:bg-red-100 dark:hover:bg-red-900/30"
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Sanity Tracker */}
        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-2">
            <Image
              src="/assets/images/Sanity.webp"
              alt="Sanity"
              width={24}
              height={24}
              className=" rounded-full"
            />
            <span className="font-medium text-blue-700 dark:text-blue-300">
              Sanity
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSanityChange(-1)}
              disabled={sanity <= 0}
              className="h-8 w-8 p-0 border-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
            <span className="text-lg font-bold min-w-[3rem] text-center text-blue-700 dark:text-blue-300">
              {sanity}/{investigator.sanity}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSanityChange(1)}
              disabled={sanity >= investigator.sanity}
              className="h-8 w-8 p-0 border-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Resources Tracker */}
        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-2">
            <Image
              src="/assets/images/Resource.webp"
              alt="Resources"
              width={24}
              height={24}
              className=" rounded-full"
            />
            <span className="font-medium text-green-700 dark:text-green-300">
              Resources
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleResourceChange(-1)}
              disabled={resources <= 0}
              className="h-8 w-8 p-0 border-green-300 hover:bg-green-100 dark:hover:bg-green-900/30"
            >
              <MinusIcon className="h-4 w-4" />
            </Button>
            <span className="text-lg font-bold min-w-[3rem] text-center text-green-700 dark:text-green-300">
              {resources}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleResourceChange(1)}
              className="h-8 w-8 p-0 border-green-300 hover:bg-green-100 dark:hover:bg-green-900/30"
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* Action tracker */}
        <Card className="mb-8 shadow-md p-1">
          <CardTitle className="flex items-center gap-3">
            Action Checklist
          </CardTitle>
          <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-row flex-wrap gap-4">
              {checks.map((isChecked, index) => (
                <Checkbox
                  key={index}
                  checked={isChecked}
                  onCheckedChange={() => handleToggle(index)}
                  className="h-6 w-6"
                />
              ))}
            </div>
            <Button onClick={handleNextRound} variant="secondary">
              <RefreshCw className="mr-2 h-4 w-4" />
              Next Round
            </Button>
          </CardContent>
        </Card>
      </CardContent>
      
    </Card>
  );
};

export default PlayerTracker;
