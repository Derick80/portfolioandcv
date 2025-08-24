"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArkhamInvestigatorCard } from "@/local_resources/arkham-types";
import InvestigatorSelect from "./investigator-select";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { MinusIcon, PlusIcon, RefreshCw, UserPlus, UserMinus } from "lucide-react";
import Image from "next/image";

type Props = {
  investigators: ArkhamInvestigatorCard[];
};

type PlayerTrackerProps = {
  investigator: ArkhamInvestigatorCard;
  actionChecks: boolean[];
  onActionToggle: (index: number) => void;
  onNextRound: () => void;
};

const PlayerTracker = ({ investigator, actionChecks, onActionToggle, onNextRound }: PlayerTrackerProps) => {
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
              {actionChecks.map((isChecked, index) => (
                <Checkbox
                  key={index}
                  checked={isChecked}
                  onCheckedChange={() => onActionToggle(index)}
                  className="h-6 w-6"
                />
              ))}
            </div>
            <Button onClick={onNextRound} variant="secondary">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset Actions
            </Button>
          </CardContent>
        </Card>
      </CardContent>
      
    </Card>
  );
};


export default function InvestigatorTracker(
  { investigators }: Props
) {
  const [selectedCodes, setSelectedCodes] = useState<string>("");
  const [allInvestigators, setAllInvestigators] = useState<
    ArkhamInvestigatorCard[]
  >(investigators);
  
  // Action tracker state for each selected investigator
  const [playerActionTrackers, setPlayerActionTrackers] = useState<{[key: string]: boolean[]}>({});
  
  // State to control investigator select visibility
  const [showInvestigatorSelect, setShowInvestigatorSelect] = useState<boolean>(true);
  
  const [doom, setDoom] = React.useState(Array(20).fill(false));
  const [drawPlayerOneEncounterCard, setDrawPlayerOneEncounterCard] =
    React.useState(Array(20).fill(false));
  const [drawPlayerTwoEncounterCard, setDrawPlayerTwoEncounterCard] =
    React.useState(Array(20).fill(false));
  const [endOfMythosPhase, setEndOfMythosPhase] = React.useState(
    Array(20).fill(false),
  );

 const [huntersMove,setHuntersMove] = useState(Array(20).fill(false));
    const [enemiesAttack,setEnemiesAttack] = useState(Array(20).fill(false));
   
    
  const selectedInvestigators = allInvestigators.filter((inv) =>
    selectedCodes.includes(inv.code),
  );

  // Initialize action tracker state for new investigators
  React.useEffect(() => {
    selectedInvestigators.forEach(investigator => {
      if (!playerActionTrackers[investigator.code]) {
        setPlayerActionTrackers(prev => ({
          ...prev,
          [investigator.code]: Array(5).fill(false)
        }));
      }
    });
  }, [selectedInvestigators, playerActionTrackers]);

  // Helper functions for action tracker management
  const handleActionToggle = (investigatorCode: string, index: number) => {
    setPlayerActionTrackers(prev => ({
      ...prev,
      [investigatorCode]: prev[investigatorCode]?.map((checked, i) => 
        i === index ? !checked : checked
      ) || Array(5).fill(false)
    }));
  };

  const handleNextRound = (investigatorCode: string) => {
    setPlayerActionTrackers(prev => ({
      ...prev,
      [investigatorCode]: Array(5).fill(false)
    }));
  };

  const resetAllActionTrackers = () => {
    const resetTrackers: {[key: string]: boolean[]} = {};
    selectedInvestigators.forEach(investigator => {
      resetTrackers[investigator.code] = Array(5).fill(false);
    });
    setPlayerActionTrackers(resetTrackers);
  };




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

  const [resetExhausted, setResetExhausted] = React.useState(
      Array(20).fill(false),
    );
    const [player1CardDraw, setPlayer1CardDraw] = React.useState(
      Array(20).fill(false),
    );
    const [player2CardDraw, setPlayer2CardDraw] = React.useState(
      Array(20).fill(false),
    );
  
    const [receiveOneResource, setReceiveOneResource] = React.useState(
      Array(20).fill(false),
    );
  
    const [checkHand, setCheckHand] = React.useState(Array(20).fill(false));
    const handleResetExhaustedChange = (index: number) => {
      const newlyReadied = [...resetExhausted];
      newlyReadied[index] = !newlyReadied[index];
      setResetExhausted(newlyReadied);
    };
  
    const handlePlayer1CardDrawChange = (index: number) => {
      const newlyDrawn = [...player1CardDraw];
      newlyDrawn[index] = !newlyDrawn[index];
      setPlayer1CardDraw(newlyDrawn);
    };
  
    const handlePlayer2CardDrawChange = (index: number) => {
      const newlyDrawn = [...player2CardDraw];
      newlyDrawn[index] = !newlyDrawn[index];
      setPlayer2CardDraw(newlyDrawn);
    };
  
    const handleReceiveOneResourceChange = (index: number) => {
      const newlyReceived = [...receiveOneResource];
      newlyReceived[index] = !newlyReceived[index];
      setReceiveOneResource(newlyReceived);
    };
  
    const handleCheckHandChange = (index: number) => {
      const newlyChecked = [...checkHand];
      newlyChecked[index] = !newlyChecked[index];
      setCheckHand(newlyChecked);
    };

   const handleHuntersMoveChange = (index: number) => {
      const newlyMoved = [...huntersMove];
      newlyMoved[index] = !newlyMoved[index];
      setHuntersMove(newlyMoved);
    };

    const handleEnemiesAttackChange = (index: number) => {
      const newlyAttacked = [...enemiesAttack];
      newlyAttacked[index] = !newlyAttacked[index];
      setEnemiesAttack(newlyAttacked);
    };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex  items-center justify-around gap-2 w-full">
        <p className="text-lg font-semibold">Investigator Tracker</p>

        {showInvestigatorSelect && (
          <InvestigatorSelect
            onSelect={(selectedInvestigator) => {
              if (selectedInvestigator) {
                setSelectedCodes(
                  selectedCodes
                    ? `${selectedCodes},${selectedInvestigator.code}`
                    : selectedInvestigator.code,
                );
              }
            }}
          />
        )}
          </div>
      </CardHeader>
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
      <Separator />

      <div className="flex flex-col md:flex-row justify-around  gap-8">
        {selectedInvestigators.map((investigator) => (
          <PlayerTracker 
            key={investigator.code} 
            investigator={investigator}
            actionChecks={playerActionTrackers[investigator.code] || Array(5).fill(false)}
            onActionToggle={(index) => handleActionToggle(investigator.code, index)}
            onNextRound={() => handleNextRound(investigator.code)}
          />
        ))}
      </div>
      <Separator />
{/* Enemy Phase */}
    
 <div className="flex flex-col space-y-4">
        <p className="text-blue-500 underline">Enemy Phase:</p> 
        <p className="text-blue-500">Hunter&apos;s Move:</p>
        <div className="flex flex-wrap gap-1">
          {huntersMove.map((isChecked, index) => (
            <Checkbox
              key={index}
              checked={isChecked}
              onCheckedChange={() => handleHuntersMoveChange(index)}
              className="h-6 w-6 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-400"
            />
          ))}
        </div>
        <p className="text-blue-500">Enemies Attack:</p>
        <div className="flex flex-wrap gap-1">
          {enemiesAttack.map((isChecked, index) => (
            <Checkbox
              key={index}
              checked={isChecked}
              onCheckedChange={() => handleEnemiesAttackChange(index)}
              className="h-6 w-6 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-400"
            />
          ))}
        </div>
      </div>
    {/* Upkeep Phase */}
      <Separator />
      <div className="flex flex-col space-y-2">
        <p className="text-blue-500">Ready/Exhausted Cards:</p>
        <div className="flex flex-row flex-wrap gap-1">
          {resetExhausted.map((isChecked, index) => (
            <Checkbox
            key={index}
            checked={isChecked}
            onCheckedChange={() => handleResetExhaustedChange(index)}
            className="h-6 w-6 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-400"
          />
        ))}
      </div>
      <p className="text-blue-500">Player One Card Draw:</p>
      <div className="flex flex-row flex-wrap gap-1">
        {player1CardDraw.map((isChecked, index) => (
          <Checkbox
            key={index}
            checked={isChecked}
            onCheckedChange={() => handlePlayer1CardDrawChange(index)}
            className="h-6 w-6 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-400"
          />
        ))}
      </div>
      <p className="text-blue-500">Player Two Card Draw:</p>
      <div className="flex flex-row flex-wrap gap-1">
        {player2CardDraw.map((isChecked, index) => (
          <Checkbox
            key={index}
            checked={isChecked}
            onCheckedChange={() => handlePlayer2CardDrawChange(index)}
            className="h-6 w-6 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-400"
          />
        ))}
      </div>
      <p className="text-blue-500">Receive One Resource:</p>
      <div className="flex flex-row flex-wrap gap-1">
        {receiveOneResource.map((isChecked, index) => (
          <Checkbox
            key={index}
            checked={isChecked}
            onCheckedChange={() => handleReceiveOneResourceChange(index)}
            className="h-6 w-6 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-400"
          />
        ))}
      </div>
      <p className="text-blue-500">Check Hand:</p>
      <div className="flex flex-row flex-wrap gap-1">
        {checkHand.map((isChecked, index) => (
          <Checkbox
            key={index}
            checked={isChecked}
            onCheckedChange={() => handleCheckHandChange(index)}
            className="h-6 w-6 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-400"
          />
        ))}
      </div>
    </div>
    
    {/* Global Reset Button for Action Trackers */}
    {selectedInvestigators.length > 0 && (
      <>
        <Separator />
        <div className="flex justify-center p-4">
          <Button 
            onClick={resetAllActionTrackers} 
            variant="outline" 
            className="bg-orange-50 border-orange-300 hover:bg-orange-100 dark:bg-orange-950/20 dark:border-orange-800 dark:hover:bg-orange-900/30"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset All Player Action Trackers
          </Button>
        </div>
      </>
    )}
     
    </Card>
  );
}
