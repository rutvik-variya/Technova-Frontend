"use client";

import { useState } from "react";
import { useCancelOrder } from "@/hooks/order/useCancelOrder";
import { Loader2, XCircle, AlertTriangle, X } from "lucide-react";

interface CancelOrderButtonProps {
  orderId: string;
}

export default function CancelOrderButton({ orderId }: CancelOrderButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const cancelOrderMutation = useCancelOrder();

  const handleCancel = () => {
    cancelOrderMutation.mutate(
      { orderId },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      },
    );
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        disabled={cancelOrderMutation.isPending}
        className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3.5 py-1.5 text-xs font-semibold text-rose-700 transition-all hover:bg-rose-600 hover:text-white hover:border-rose-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <XCircle className="h-3.5 w-3.5" />
        <span>Cancel Order</span>
      </button>

      {/* Confirmation Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur & Dim */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={() => !cancelOrderMutation.isPending && setIsOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xl shadow-slate-900/10 transition-all animate-in zoom-in-95 duration-200">
            {/* Close Icon */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              disabled={cancelOrderMutation.isPending}
              className="absolute right-4 top-4 rounded-xl p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col items-center text-center">
              {/* Alert Badge Icon */}
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 shadow-sm">
                <AlertTriangle className="h-7 w-7" />
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-slate-900">
                Cancel Order Request
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Are you sure you want to cancel this order? This action is
                permanent and cannot be undone once confirmed.
              </p>

              {/* Error Message Feedback (if any) */}
              {cancelOrderMutation.isError && (
                <div className="mt-4 w-full rounded-xl border border-rose-200 bg-rose-50 p-3 text-left text-xs font-medium text-rose-700">
                  {cancelOrderMutation.error instanceof Error
                    ? cancelOrderMutation.error.message
                    : "Failed to cancel the order. Please try again."}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 flex w-full flex-col-reverse gap-2.5 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={cancelOrderMutation.isPending}
                  className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-4 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95 disabled:opacity-50 sm:w-1/2"
                >
                  Keep Order
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={cancelOrderMutation.isPending}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-rose-600 px-4 text-xs font-semibold text-white shadow-md shadow-rose-600/20 transition-all hover:bg-rose-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-1/2"
                >
                  {cancelOrderMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Cancelling...</span>
                    </>
                  ) : (
                    <span>Confirm Cancel</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
