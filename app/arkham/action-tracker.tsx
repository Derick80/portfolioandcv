import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ClipboardCheck, RefreshCw } from "lucide-react";
import React from "react";

type ActionTrackerProps = {
  checks: boolean[];
  onToggle: (index: number) => void;
  onNextRound: () => void;
};

const ActionTracker = () => {
  const [checks, setChecks] = React.useState(Array(5).fill(false));

  const handleToggle = (index: number) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];
    setChecks(newChecks);
  };

  const handleNextRound = () => {
    setChecks(Array(5).fill(false));
  };

  return (
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
  );
};

export default ActionTracker;
