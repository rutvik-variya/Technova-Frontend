"use client";

import { X, AlertTriangle, Loader2 } from "lucide-react";

interface ConfirmOrderStatusModalProps {
  open: boolean;
  orderNumber: string;
  currentStatus: string;
  newStatus: string;
  isUpdating: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmOrderStatusModal({
  open,
  orderNumber,
  currentStatus,
  newStatus,
  isUpdating,
  onCancel,
  onConfirm,
}: ConfirmOrderStatusModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget && !isUpdating) {
            onCancel();
          }
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-status-title"
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-200"
      >
        <button
          type="button"
          onClick={onCancel}
          disabled={isUpdating}
          className="absolute right-4 top-4 rounded-xl p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors disabled:opacity-50"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 shadow-xs">
            <AlertTriangle className="h-7 w-7" />
          </div>

          <h3
            id="confirm-status-title"
            className="text-lg font-bold text-slate-900"
          >
            Confirm Status Update
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            Are you sure you want to update order{" "}
            <strong className="text-slate-900">{orderNumber}</strong> from{" "}
            <span className="font-bold text-slate-700">{currentStatus}</span> to{" "}
            <span className="font-extrabold text-blue-600">{newStatus}</span>?
          </p>

          <div className="mt-6 flex w-full flex-col-reverse gap-2.5 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onCancel}
              disabled={isUpdating}
              className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-4 text-xs font-bold text-slate-700 shadow-xs transition hover:bg-slate-50 active:scale-[0.98] disabled:opacity-50 sm:w-1/2"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isUpdating}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 text-xs font-bold text-white shadow-md shadow-slate-900/20 transition hover:bg-slate-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-1/2"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <span>Confirm Update</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
