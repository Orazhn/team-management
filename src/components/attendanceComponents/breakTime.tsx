"use client";

import { useState, type ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BreakTimeProps {
  onBreakTimeChange: (hours: number, minutes: number) => void;
}

export function BreakTime({ onBreakTimeChange }: BreakTimeProps) {
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");

  const handleHoursChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = Number.parseInt(value, 10);
    if (value === "" || (numValue >= 0 && numValue <= 23)) {
      setHours(value);
      onBreakTimeChange(numValue || 0, Number.parseInt(minutes, 10) || 0);
    }
  };

  const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = Number.parseInt(value, 10);
    if (value === "" || (numValue >= 0 && numValue <= 59)) {
      setMinutes(value);
      onBreakTimeChange(Number.parseInt(hours, 10) || 0, numValue || 0);
    }
  };

  return (
    <div className="flex gap-4 ">
      <div className=" space-y-2">
        <Label htmlFor="break-time-hours " className="font-light text-gray-600">
          H
        </Label>
        <Input
          type="number"
          id="break-time-hours"
          value={hours}
          onChange={handleHoursChange}
          min="0"
          max="23"
          placeholder="0"
          className="w-full max-w-xs"
        />
      </div>
      <div className=" space-y-2">
        <Label
          htmlFor="break-time-minutes"
          className="font-light text-gray-600"
        >
          Min
        </Label>
        <Input
          type="number"
          id="break-time-minutes"
          value={minutes}
          onChange={handleMinutesChange}
          min="0"
          max="59"
          placeholder="0"
          className="w-full max-w-xs"
        />
      </div>
    </div>
  );
}
