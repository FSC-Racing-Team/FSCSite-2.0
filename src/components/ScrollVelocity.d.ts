export {};

declare module "./ScrollVelocity" {
  import type { ComponentType, ReactNode } from "react";

  interface ScrollVelocityProps {
    texts?: string[];
    velocity?: number;
    className?: string;
    damping?: number;
    stiffness?: number;
    numCopies?: number;
    velocityMapping?: { input?: number[]; output?: number[] };
    parallaxClassName?: string;
    scrollerClassName?: string;
    parallaxStyle?: object;
    scrollerStyle?: object;
    scrollContainerRef?: React.RefObject<HTMLElement>;
    children?: ReactNode;
  }

  const ScrollVelocity: ComponentType<ScrollVelocityProps>;
  export default ScrollVelocity;
}
