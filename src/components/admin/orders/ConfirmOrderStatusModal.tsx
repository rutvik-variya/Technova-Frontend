"use client";

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isUpdating) {
          onCancel();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-status-title"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
      >
        <h2
          id="confirm-status-title"
          className="text-lg font-semibold text-gray-900"
        >
          Confirm status update
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Are you sure you want to update order{" "}
          <span className="font-medium text-gray-900">{orderNumber}</span> from{" "}
          <span className="font-medium">{currentStatus}</span> to{" "}
          <span className="font-semibold text-gray-900">{newStatus}</span>?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isUpdating}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            No, Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isUpdating}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUpdating ? "Updating..." : "Yes, Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
