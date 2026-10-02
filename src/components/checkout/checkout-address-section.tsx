"use client";

import { useEffect, useState } from "react";
import { Plus, MapPin, RefreshCw, AlertCircle } from "lucide-react";

import type { Address, CreateAddressPayload } from "@/types/address";

import { useAddresses } from "@/hooks/address/use-addresses";
import { useCreateAddress } from "@/hooks/address/use-create-address";
import { useUpdateAddress } from "@/hooks/address/use-update-address";

import { AddressCard } from "@/components/address/address-card";
import { AddressForm } from "@/components/address/address-form";

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
    if (!editingAddress) return;

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
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all sm:p-6 md:p-7">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold tracking-wider text-slate-700">
            01
          </span>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Shipping Address
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
              Select or add an address for your delivery.
            </p>
          </div>
        </div>

        {!isLoading && !showForm && (
          <button
            type="button"
            onClick={handleAddAddress}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-xs transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-950 sm:text-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add address</span>
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
        <div className="mt-6 flex flex-col items-start gap-3 rounded-2xl border border-red-200/80 bg-red-50/50 p-5 text-red-900">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
            <p className="text-sm font-medium">
              Failed to load your addresses.
            </p>
          </div>
          <button
            type="button"
            onClick={() => refetch()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 hover:underline"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Try again
          </button>
        </div>
      )}

      {/* Add / Edit form */}
      {!isLoading && !isError && showForm && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-6">
          <div className="mb-5 pb-4 border-b border-slate-200/60">
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              {editingAddress ? "Edit address" : "Add new address"}
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
              Enter your complete delivery address details below.
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
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 px-6 py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <MapPin className="h-6 w-6" />
              </div>
              <p className="mt-3 text-sm font-medium text-slate-800">
                You don&apos;t have any saved addresses.
              </p>
              <p className="mt-1 text-xs text-slate-500 max-w-xs">
                Add an address to proceed with your checkout smoothly.
              </p>
              <button
                type="button"
                onClick={handleAddAddress}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 sm:text-sm"
              >
                <Plus className="h-4 w-4" />
                Add your first address
              </button>
            </div>
          ) : (
            <div className="grid gap-3.5 sm:grid-cols-1">
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

export function AddressListSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-2xl border border-slate-200/80 p-4 sm:p-5"
        >
          <div className="flex items-center justify-between">
            <div className="h-5 w-32 rounded-lg bg-slate-200" />
            <div className="h-4 w-24 rounded-lg bg-slate-100" />
          </div>

          <div className="mt-4 space-y-2">
            <div className="h-4 w-3/4 rounded-md bg-slate-200/70" />
            <div className="h-4 w-2/3 rounded-md bg-slate-100" />
            <div className="h-4 w-1/2 rounded-md bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
