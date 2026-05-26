import { ReactNode, CSSProperties } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li";
}

const Reveal = ({ children, delay = 0, className = "", as: Tag = "div" }: RevealProps) => {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const style: CSSProperties = { transitionDelay: `${delay}ms` };
  return (
    <Tag
      ref={ref as never}
      style={style}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
