import Image from "next/image";

interface CartItemImageProps {
  src: string | null;
  alt: string;
}

export function CartItemImage({ src, alt }: CartItemImageProps) {
  return (
    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-2 sm:h-32 sm:w-32">
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 96px, 128px"
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          loading="eager"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-xs font-semibold text-slate-400">
          No image
        </div>
      )}
    </div>
  );
}
