import type { ReactNode } from "react";

export function TarotCard({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  return (
    <Tag
      className={`tarot-border ornament-corners rounded-sm p-6 transition-all duration-300 ${className}`}
    >
      {children}
    </Tag>
  );
}
