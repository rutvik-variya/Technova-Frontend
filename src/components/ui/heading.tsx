import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  description?: string;
  className?: string;
}

export default function Heading({
  title,
  description,
  className,
}: HeadingProps) {
  return (
    <div className={cn("mb-8", className)}>
      <h2 className="text-base font-bold tracking-tight text-gray-900 sm:text-[22px] lg:text-[22px]">
        {title}
      </h2>

      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
