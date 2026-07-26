"use client";

import {
  Children,
  isValidElement,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { motion, useReducedMotion } from "motion/react";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 14,
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
  staggerDelay = 0.04,
}: StaggerProps) {
  const items = Children.toArray(children);
  const shouldReduceMotion = useReducedMotion();

  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 767px)"
    );

    const updateIsMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateIsMobile();
    setHasMounted(true);

    mediaQuery.addEventListener(
      "change",
      updateIsMobile
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateIsMobile
      );
    };
  }, []);

  // El contenido siempre se muestra durante el primer render.
  // Así nunca depende de JavaScript para ser visible.
  if (
    !hasMounted ||
    isMobile ||
    shouldReduceMotion
  ) {
    return (
      <div className={className}>
        {items.map((child, index) => {
          const childKey =
            isValidElement(child) &&
            child.key != null
              ? child.key
              : index;

          return (
            <div key={childKey}>{child}</div>
          );
        })}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.01,
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
          isValidElement(child) &&
          child.key != null
            ? child.key
            : index;

        return (
          <motion.div
            key={childKey}
            variants={itemVariants}
            transition={{
              duration: 0.25,
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