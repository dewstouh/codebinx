"use client";

import { motion } from "motion/react";
import React, { ElementType, forwardRef, ReactNode } from "react";

interface MotionWrapperProps {
    type?: keyof typeof motion;
    children: ReactNode;
    [key: string]: any;
}

const MotionWrapper = forwardRef<any, MotionWrapperProps>(({ type = "div", children, ...props }, ref) => {
    const Component = motion[type as keyof typeof motion] as ElementType;
    return (
        <Component ref={ref} {...props}>
            {children}
        </Component>
    );
});

MotionWrapper.displayName = "MotionWrapper";

export default MotionWrapper;
