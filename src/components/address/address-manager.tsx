"use client";

import { useState } from "react";

import type { Address, CreateAddressPayload } from "@/types/address";

import { useAddresses } from "@/hooks/address/use-addresses";
import { useCreateAddress } from "@/hooks/address/use-create-address";
import { useUpdateAddress } from "@/hooks/address/use-update-address";
import { useDeleteAddress } from "@/hooks/address/use-delete-address";
import { useSetDefaultAddress } from "@/hooks/address/use-set-default-address";

import { AddressList } from "./address-list";
import { AddressForm } from "./address-form";
import { AddressListSkeleton } from "./address-list-skeleton";

export function AddressManager() {
  const { data: addresses = [], isLoading, isError, refetch } = useAddresses();

  const createAddressMutation = useCreateAddress();

  const updateAddressMutation = useUpdateAddress();

  const deleteAddressMutation = useDeleteAddress();

  const setDefaultAddressMutation = useSetDefaultAddress();

  const [showForm, setShowForm] = useState(false);

  const [editingAddress, setEditingAddress] = useState<Address>();

  const handleCreate = (values: CreateAddressPayload) => {
    createAddressMutation.mutate(values, {
      onSuccess: () => {
        setShowForm(false);
      },
    });
  };

  const handleUpdate = (values: CreateAddressPayload) => {
    if (!editingAddress) return;

    updateAddressMutation.mutate(
      {
        addressId: editingAddress.id,
        payload: values,
      },
      {
        onSuccess: () => {
          setEditingAddress(undefined);
          setShowForm(false);
        },
      },
    );
  };

  const handleDelete = (addressId: string) => {
    deleteAddressMutation.mutate(addressId);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleSetDefault = (addressId: string) => {
    setDefaultAddressMutation.mutate(addressId);
  };

  if (isLoading) {
    return <AddressListSkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="text-sm text-red-700">Failed to load addresses.</p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-3 text-sm font-medium underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {!showForm && (
        <button
          type="button"
          onClick={() => {
            setEditingAddress(undefined);
            setShowForm(true);
          }}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-800"
        >
          + Add new address
        </button>
      )}

      {showForm ? (
        <div className="rounded-xl border border-gray-200 p-5">
          <h3 className="mb-5 text-lg font-semibold">
            {editingAddress ? "Edit address" : "Add new address"}
          </h3>

          <AddressForm
            address={editingAddress}
            isSubmitting={
              createAddressMutation.isPending || updateAddressMutation.isPending
            }
            onSubmit={editingAddress ? handleUpdate : handleCreate}
            onCancel={() => {
              setEditingAddress(undefined);
              setShowForm(false);
            }}
          />
        </div>
      ) : (
        <AddressList
          addresses={addresses}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSetDefault={handleSetDefault}
        />
      )}
    </div>
  );
}
