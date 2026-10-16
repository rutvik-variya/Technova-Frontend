"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Upload,
  Trash2,
  CheckCircle,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import type { ProductImage } from "@/types/admin-product";
import { useUploadProductImages } from "@/hooks/admin/products/use-upload-product-images";
import { useSetPrimaryProductImage } from "@/hooks/admin/products/use-set-primary-product-image";
import { useDeleteProductImage } from "@/hooks/admin/products/use-delete-product-image";

interface ProductImageManagerProps {
  productId: string;
  images: ProductImage[];
}

export default function ProductImageManager({
  productId,
  images,
}: ProductImageManagerProps) {
  const [files, setFiles] = useState<File[]>([]);

  const uploadMutation = useUploadProductImages();
  const primaryMutation = useSetPrimaryProductImage();
  const deleteMutation = useDeleteProductImage();

  const handleUpload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!files.length) return;

    uploadMutation.mutate(
      { productId, files },
      { onSuccess: () => setFiles([]) },
    );
  };

  const handleDelete = (imageId: string) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    deleteMutation.mutate({ productId, imageId });
  };

  return (
    <section className="space-y-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Product Images</h2>
        <p className="mt-0.5 text-xs font-medium text-slate-500">
          Upload gallery images and select the primary display picture
        </p>
      </div>

      <form onSubmit={handleUpload} className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex-1 cursor-pointer rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-4 text-center transition hover:border-slate-400">
            <span className="text-xs font-bold text-slate-600">
              {files.length > 0
                ? `${files.length} file(s) ready to upload`
                : "Choose image files"}
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
              className="hidden"
            />
          </label>

          <button
            type="submit"
            disabled={!files.length || uploadMutation.isPending}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 text-xs font-bold text-white shadow-xs transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
          >
            {uploadMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                <span>Upload Images</span>
              </>
            )}
          </button>
        </div>

        {uploadMutation.isError && (
          <p className="text-xs font-semibold text-rose-600">
            {uploadMutation.error.message || "Failed to upload images."}
          </p>
        )}
      </form>

      {images.length === 0 ? (
        <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center text-xs font-medium text-slate-400">
          <ImageIcon className="mr-2 h-4 w-4" />
          No images uploaded yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2 shadow-xs transition hover:border-slate-300"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50">
                <Image
                  src={image.url}
                  alt="Product asset"
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-contain p-2"
                />
              </div>

              <div className="mt-2 space-y-1.5 p-1">
                {image.isPrimary ? (
                  <span className="inline-flex w-full items-center justify-center gap-1 rounded-xl bg-emerald-50 py-1 text-[11px] font-extrabold text-emerald-700">
                    <CheckCircle className="h-3 w-3" />
                    Primary Image
                  </span>
                ) : (
                  <button
                    type="button"
                    disabled={primaryMutation.isPending}
                    onClick={() =>
                      primaryMutation.mutate({ productId, imageId: image.id })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white py-1.5 text-[11px] font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 active:scale-[0.98] disabled:opacity-50"
                  >
                    Set Primary
                  </button>
                )}

                <button
                  type="button"
                  disabled={deleteMutation.isPending}
                  onClick={() => handleDelete(image.id)}
                  className="inline-flex w-full items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white py-1.5 text-[11px] font-bold text-rose-600 transition hover:border-rose-200 hover:bg-rose-50 active:scale-[0.98] disabled:opacity-50"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
