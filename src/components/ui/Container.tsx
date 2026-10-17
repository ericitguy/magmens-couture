import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  /** `narrow` suits long-form reading such as the policies. */
  width?: "default" | "narrow";
  className?: string;
  as?: ElementType;
};

export function Container({
  children,
  width = "default",
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={`${width === "narrow" ? "shell-narrow" : "shell"} ${className}`}>
      {children}
    </Tag>
  );
}

type SectionProps = {
  children: ReactNode;
  className?: string;
  /** Espresso ground for contrast sections. */
  tone?: "ivory" | "porcelain" | "espresso";
  id?: string;
  labelledBy?: string;
};

const toneClasses = {
  ivory: "bg-ivory text-espresso",
  porcelain: "bg-porcelain text-espresso",
  espresso: "bg-espresso text-ivory on-dark",
} as const;

export function Section({
  children,
  className = "",
  tone = "ivory",
  id,
  labelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${toneClasses[tone]} py-20 md:py-28 lg:py-32 ${className}`}
    >
      {children}
    </section>
  );
}
