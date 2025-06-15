"use client";

import React from "react";
import { motion } from "motion/react";

interface PageProps {
    title?: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
    animate?: boolean;
    centered?: boolean;
}

export default function PageBase({
    title,
    description,
    children,
    className = "pt-16",
    animate = true,
    centered = true,
}: PageProps) {
    const Wrapper = animate ? motion.div : "div";
    const ChildWrapper = animate ? motion.div : "div";

    return (
        <div className={`min-h-screen flex flex-col ${centered ? "items-center" : ""} ${className}`}>
            <Wrapper
                className="w-full max-w-6xl mx-auto"
                {...(animate && {
                    variants: {
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15 },
                        },
                    },
                    initial: "hidden",
                    animate: "visible",
                })}
            >
                {(title || description) && (
                    <div className={`${centered ? "text-center" : ""} mb-12 md:mb-16`}>
                        {title && (
                            <motion.h1
                                className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight"
                                variants={{
                                    hidden: { y: 20, opacity: 0 },
                                    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
                                }}
                            >
                                {title}
                            </motion.h1>
                        )}
                        {description && (
                            <motion.p
                                className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
                                variants={{
                                    hidden: { y: 20, opacity: 0 },
                                    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
                                }}
                            >
                                {description}
                            </motion.p>
                        )}
                    </div>
                )}

                {/* Aquí animamos el contenido dinámico */}
                <ChildWrapper
                    {...(animate && {
                        variants: {
                            hidden: { y: 20, opacity: 0 },
                            visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
                        },
                    })}
                >
                    {children}
                </ChildWrapper>
            </Wrapper>
        </div>
    );
}
