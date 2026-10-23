"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Upload,
  Trash2,
  CheckCircle,
  Image as ImageIcon,
  Loader2,
  AlertTriangle,
  X,
} from "lucide-react";
import type { ProductImage } from "@/types/admin-product";
import { useUploadProductImages } from "@/hooks/admin/products/use-upload-product-images";
import { useSetPrimaryProductImage } from "@/hooks/admin/products/use-set-primary-product-image";
import { useDeleteProductImage } from "@/hooks/admin/products/use-delete-product-image";
import { getApiError } from "@/lib/api-error";

interface ProductImageManagerProps {
  productId: string;
  productQueryKey?: string;
  images: ProductImage[];
}

export default function ProductImageManager({
  productId,
  productQueryKey = productId,
  images,
}: ProductImageManagerProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [imageToDelete, setImageToDelete] = useState<ProductImage | null>(null);
  const previews = useMemo(
    () => files.map((file) => URL.createObjectURL(file)),
    [files],
  );

  useEffect(
    () => () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    },
    [previews],
  );

  const uploadMutation = useUploadProductImages();
  const primaryMutation = useSetPrimaryProductImage();
  const deleteMutation = useDeleteProductImage();

  const handleUpload = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!files.length) return;

    uploadMutation.mutate(
      { productId, productQueryKey, files },
      { onSuccess: () => setFiles([]) },
    );
  };

  const confirmDelete = () => {
    if (!imageToDelete) return;
    deleteMutation.mutate(
      { productId, productQueryKey, imageId: imageToDelete.id },
      { onSuccess: () => setImageToDelete(null) },
    );
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
              onChange={(e) => {
                setFiles(Array.from(e.target.files ?? []));
                e.currentTarget.value = "";
              }}
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

        {files.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${file.lastModified}-${index}`}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white p-2"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-50">
                  {/* Local object URLs are created and revoked by this component. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previews[index]}
                    alt={file.name}
                    className="h-full w-full object-contain p-1"
                  />
                </div>
                <p className="mt-1 truncate text-[11px] font-semibold text-slate-600">
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        )}

        {uploadMutation.isError && (
          <p className="text-xs font-semibold text-rose-600">
            {getApiError(uploadMutation.error).message}
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
                      primaryMutation.mutate({
                        productId,
                        productQueryKey,
                        imageId: image.id,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white py-1.5 text-[11px] font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 active:scale-[0.98] disabled:opacity-50"
                  >
                    Set Primary
                  </button>
                )}

                <button
                  type="button"
                  disabled={deleteMutation.isPending}
                  onClick={() => setImageToDelete(image)}
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

      {imageToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-image-title"
        >
          <button
            type="button"
            aria-label="Close delete image dialog"
            disabled={deleteMutation.isPending}
            onClick={() => setImageToDelete(null)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200 disabled:cursor-not-allowed"
          />

          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-200">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setImageToDelete(null)}
              disabled={deleteMutation.isPending}
              className="absolute right-4 top-4 rounded-xl p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-rose-600 shadow-xs">
                <AlertTriangle className="h-7 w-7" />
              </div>

              <h3
                id="delete-image-title"
                className="text-lg font-bold text-slate-900"
              >
                Delete Product Image
              </h3>

              <div className="mt-4 h-28 w-28 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2">
                <Image
                  src={imageToDelete.url}
                  alt="Image selected for deletion"
                  width={112}
                  height={112}
                  className="h-full w-full object-contain"
                />
              </div>

              <p className="mt-3 max-w-sm text-xs leading-relaxed text-slate-500">
                Are you sure you want to permanently delete this product image?
              </p>

              <div className="mt-6 flex w-full flex-col-reverse gap-2.5 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => setImageToDelete(null)}
                  disabled={deleteMutation.isPending}
                  className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-4 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 active:scale-[0.98] disabled:opacity-50 sm:w-1/2"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={deleteMutation.isPending}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-rose-600 px-4 text-xs font-bold text-white shadow-md shadow-rose-600/20 transition hover:bg-rose-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-1/2"
                >
                  {deleteMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Confirm Delete</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
