import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

export const BottomTracker = () => {
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

  return (
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
  );
};
