import React from 'react';
import { twMerge } from "tailwind-merge"

const Container = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={twMerge(
          "mx-auto flex items-center max-w-7xl p-3",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

export default Container