import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "whatsapp";

type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "children"
>;

const baseClasses =
  "inline-flex items-center justify-center rounded-full font-medium transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-zinc-950 text-white shadow-sm hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-md",

  secondary:
    "border border-zinc-300 bg-white text-zinc-900 hover:-translate-y-0.5 hover:border-zinc-900 hover:shadow-sm",

  ghost:
    "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950",

  whatsapp:
    "bg-green-500 text-white shadow-sm hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-md",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  external = false,
  ariaLabel,
  type = "button",
  ...buttonProps
}: ButtonProps) {
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "w-fit",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={classes}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={classes}
      {...buttonProps}
    >
      {children}
    </button>
  );
}