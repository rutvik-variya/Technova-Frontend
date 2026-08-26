import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function Section({ children, className }: SectionProps) {
  return (
    <section className={cn("py-10 sm:py-12 lg:py-16", className)}>
      {children}
    </section>
  );
}
