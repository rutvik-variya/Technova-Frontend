import Image from "next/image";

interface CartItemImageProps {
  src: string | null;
  alt: string;
}

export function CartItemImage({ src, alt }: CartItemImageProps) {
  return (
    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-32 sm:w-32">
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 96px, 128px"
          className="object-contain p-2"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
          No image
        </div>
      )}
    </div>
  );
}
