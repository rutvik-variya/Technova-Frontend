"use client";

import { useState } from "react";
import { ORDER_STATUS_TRANSITIONS } from "@/app/admin/orders/constant";
import { useUpdateAdminOrderStatus } from "@/hooks/admin/useAdminOrders";
import type { OrderStatus } from "@/types/admin-order.types";
import ConfirmOrderStatusModal from "./ConfirmOrderStatusModal";
import OrderStatusBadge from "./OrderStatusBadge";

interface OrderStatusSelectProps {
  orderId: string;
  orderNumber: string;
  currentStatus: OrderStatus;
}

export default function OrderStatusSelect({
  orderId,
  orderNumber,
  currentStatus,
}: OrderStatusSelectProps) {
  const [statusSelection, setStatusSelection] = useState({
    currentStatus,
    selectedStatus: currentStatus,
  });
  const selectedStatus =
    statusSelection.currentStatus === currentStatus
      ? statusSelection.selectedStatus
      : currentStatus;

  const updateSelectedStatus = (status: OrderStatus) => {
    setStatusSelection({ currentStatus, selectedStatus: status });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const mutation = useUpdateAdminOrderStatus(orderId);
  const availableStatuses = ORDER_STATUS_TRANSITIONS[currentStatus];

  const handleStatusChange = (value: string) => {
    const nextStatus = value as OrderStatus;
    if (!availableStatuses.includes(nextStatus)) {
      updateSelectedStatus(currentStatus);
      return;
    }

    updateSelectedStatus(nextStatus);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    updateSelectedStatus(currentStatus);
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    if (
      selectedStatus === currentStatus ||
      !availableStatuses.includes(selectedStatus) ||
      mutation.isPending
    ) {
      return;
    }

    mutation.mutate(
      { status: selectedStatus },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          updateSelectedStatus(selectedStatus);
        },
      },
    );
  };

  return (
    <div className="min-w-37.5 space-y-2">
      <select
        aria-label={`Update status for ${orderNumber}`}
        value={selectedStatus}
        onChange={(event) => handleStatusChange(event.target.value)}
        disabled={mutation.isPending || availableStatuses.length === 0}
        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 outline-none transition focus:border-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value={currentStatus}>{currentStatus}</option>
        {availableStatuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <OrderStatusBadge status={currentStatus} />

      {mutation.isError && (
        <p role="alert" className="text-xs font-semibold text-rose-600">
          {mutation.error instanceof Error
            ? mutation.error.message
            : "Unable to update status."}
        </p>
      )}

      <ConfirmOrderStatusModal
        open={isModalOpen}
        orderNumber={orderNumber}
        currentStatus={currentStatus}
        newStatus={selectedStatus}
        isUpdating={mutation.isPending}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
