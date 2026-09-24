"use client";

import { useEffect, useState } from "react";

import type { Address, CreateAddressPayload } from "@/types/address";

import { useAddresses } from "@/hooks/address/use-addresses";
import { useCreateAddress } from "@/hooks/address/use-create-address";
import { useUpdateAddress } from "@/hooks/address/use-update-address";

import { AddressCard } from "@/components/address/address-card";
import { AddressForm } from "@/components/address/address-form";
import { AddressListSkeleton } from "@/components/address/address-list-skeleton";

interface CheckoutAddressSectionProps {
  selectedAddressId?: string;
  onAddressSelect: (addressId: string) => void;
}

export function CheckoutAddressSection({
  selectedAddressId,
  onAddressSelect,
}: CheckoutAddressSectionProps) {
  const { data: addresses = [], isLoading, isError, refetch } = useAddresses();

  const createAddressMutation = useCreateAddress();

  const updateAddressMutation = useUpdateAddress();

  const [showForm, setShowForm] = useState(false);

  const [editingAddress, setEditingAddress] = useState<Address | undefined>();

  useEffect(() => {
    if (selectedAddressId || addresses.length === 0) {
      return;
    }

    const defaultAddress = addresses.find((address) => address.isDefault);

    onAddressSelect(defaultAddress?.id ?? addresses[0].id);
  }, [addresses, selectedAddressId, onAddressSelect]);

  const handleAddAddress = () => {
    setEditingAddress(undefined);
    setShowForm(true);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleCreateAddress = (values: CreateAddressPayload) => {
    createAddressMutation.mutate(values, {
      onSuccess: (newAddress) => {
        onAddressSelect(newAddress.id);

        setShowForm(false);
        setEditingAddress(undefined);
      },
    });
  };

  const handleUpdateAddress = (values: CreateAddressPayload) => {
    if (!editingAddress) {
      return;
    }

    updateAddressMutation.mutate(
      {
        addressId: editingAddress.id,
        payload: values,
      },
      {
        onSuccess: (updatedAddress) => {
          onAddressSelect(updatedAddress.id);

          setShowForm(false);
          setEditingAddress(undefined);
        },
      },
    );
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingAddress(undefined);
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">01</p>

          <h2 className="mt-1 text-xl font-semibold text-gray-900">
            Shipping address
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Select an address for your order.
          </p>
        </div>

        {!isLoading && !showForm && (
          <button
            type="button"
            onClick={handleAddAddress}
            className="shrink-0 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
          >
            + Add address
          </button>
        )}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="mt-6">
          <AddressListSkeleton />
        </div>
      )}

      {/* Error */}
      {!isLoading && isError && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm text-red-700">Failed to load your addresses.</p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 text-sm font-medium text-red-700 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Add / Edit form */}
      {!isLoading && !isError && showForm && (
        <div className="mt-6 rounded-xl border border-gray-200 p-5">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingAddress ? "Edit address" : "Add new address"}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Enter your delivery address details.
            </p>
          </div>

          <AddressForm
            address={editingAddress}
            isSubmitting={
              createAddressMutation.isPending || updateAddressMutation.isPending
            }
            onSubmit={
              editingAddress ? handleUpdateAddress : handleCreateAddress
            }
            onCancel={handleCancelForm}
          />
        </div>
      )}

      {/* Address list */}
      {!isLoading && !isError && !showForm && (
        <div className="mt-6">
          {addresses.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center">
              <p className="text-sm text-gray-600">
                You don&apos;t have any saved addresses.
              </p>

              <button
                type="button"
                onClick={handleAddAddress}
                className="mt-4 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Add your first address
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  selected={selectedAddressId === address.id}
                  onSelect={onAddressSelect}
                  onEdit={handleEditAddress}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
