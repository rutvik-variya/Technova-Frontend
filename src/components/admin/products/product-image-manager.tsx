"use client";

import { useState } from "react";
import Image from "next/image";
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
      {
        onSuccess: () => setFiles([]),
      },
    );
  };

  const handleDelete = (imageId: string) => {
    if (!window.confirm("Delete this product image?")) return;

    deleteMutation.mutate({ productId, imageId });
  };

  return (
    <section className="space-y-5 rounded-xl border border-gray-200 bg-white p-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Product Images</h2>
        <p className="mt-1 text-sm text-gray-500">
          Upload images and choose the primary product image.
        </p>
      </div>

      <form onSubmit={handleUpload} className="space-y-3">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(event) => setFiles(Array.from(event.target.files ?? []))}
          className="block w-full rounded-lg border border-gray-300 p-2 text-sm"
        />

        {files.length > 0 && (
          <p className="text-sm text-gray-600">
            {files.length} file(s) selected
          </p>
        )}

        <button
          type="submit"
          disabled={!files.length || uploadMutation.isPending}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploadMutation.isPending ? "Uploading..." : "Upload Images"}
        </button>

        {uploadMutation.isError && (
          <p className="text-sm text-red-600">
            {uploadMutation.error.message || "Failed to upload images."}
          </p>
        )}
      </form>

      {images.length === 0 ? (
        <p className="text-sm text-gray-500">No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-lg border border-gray-200"
            >
              <div className="relative flex aspect-square items-center justify-center bg-gray-50">
                <Image
                  src={image.url}
                  alt="Product"
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-contain"
                />
              </div>

              <div className="space-y-2 p-3">
                {image.isPrimary && (
                  <span className="inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                    Primary
                  </span>
                )}

                {!image.isPrimary && (
                  <button
                    type="button"
                    disabled={primaryMutation.isPending}
                    onClick={() =>
                      primaryMutation.mutate({ productId, imageId: image.id })
                    }
                    className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm disabled:opacity-50"
                  >
                    Set as Primary
                  </button>
                )}

                <button
                  type="button"
                  disabled={deleteMutation.isPending}
                  onClick={() => handleDelete(image.id)}
                  className="w-full rounded-md border border-red-200 px-2 py-1.5 text-sm text-red-600 disabled:opacity-50"
                >
                  Delete Image
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(primaryMutation.isError || deleteMutation.isError) && (
        <p className="text-sm text-red-600">
          {primaryMutation.error?.message ||
            deleteMutation.error?.message ||
            "The image operation failed."}
        </p>
      )}
    </section>
  );
}
