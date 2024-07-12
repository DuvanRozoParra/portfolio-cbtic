import React, { FC } from "react";
import { Slider } from "@/components/ui/slider";
import { useFaraday } from "@/store";
import { cn } from "@/lib/utils";

type SliderProps = React.ComponentProps<typeof Slider> & {
    title: string;
    onValue: (newDate: number) => void;
}

export const Inputs: FC<SliderProps> = ({ title, onValue, className, ...props}) => {
  return (
    <section>
      <p>{title}</p>
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        className={cn("w-[60%]", className)}
        onValueChange={(current) => {
            onValue(current[0]);
        }}
        {...props}
      />
    </section>
  );
};
