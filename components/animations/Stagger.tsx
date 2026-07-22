"use client";

import {
  Children,
  isValidElement,
  type ReactNode,
} from "react";
import { motion } from "motion/react";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Stagger({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.07,
}: StaggerProps) {
  const items = Children.toArray(children);

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.05,
      }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {items.map((child, index) => {
        const childKey =
          isValidElement(child) && child.key != null
            ? child.key
            : index;

        return (
          <motion.div
            key={childKey}
            variants={itemVariants}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}