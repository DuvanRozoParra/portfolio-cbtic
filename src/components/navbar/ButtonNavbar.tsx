import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import { SVGMotionProps, motion } from "framer-motion";

const Path = (
  props: React.JSX.IntrinsicAttributes &
    SVGMotionProps<SVGPathElement> &
    React.RefAttributes<SVGPathElement>
) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

type TButtonNavbar = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: () => void;
};

export const ButtonNavbar: FC<TButtonNavbar> = ({ onClick, ...props }) => {
  return (
    <Button variant="none" onClick={onClick} {...props}>
      <svg width="23" height="23" color="white" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </Button>
  );
};
