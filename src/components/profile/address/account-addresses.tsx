"use client";

import { useState } from "react";
import { AlertCircle, MapPin, Plus, RefreshCw } from "lucide-react";

import type { Address, CreateAddressPayload } from "@/types/address";

import { useAddresses } from "@/hooks/address/use-addresses";
import { useCreateAddress } from "@/hooks/address/use-create-address";
import { useUpdateAddress } from "@/hooks/address/use-update-address";
import { useDeleteAddress } from "@/hooks/address/use-delete-address";

import { AddressCard } from "@/components/address/address-card";
import { AddressForm } from "@/components/address/address-form";

function AccountAddressSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-slate-200 bg-slate-50 p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="h-4 w-24 rounded bg-slate-200" />
              <div className="h-3.5 w-32 rounded bg-slate-200" />
              <div className="h-3 w-full rounded bg-slate-200" />
              <div className="h-3 w-5/6 rounded bg-slate-200" />
            </div>

            <div className="h-8 w-8 rounded-lg bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AccountAddresses() {
  const { data: addresses = [], isLoading, isError, refetch } = useAddresses();

  const createAddressMutation = useCreateAddress();

  const updateAddressMutation = useUpdateAddress();

  const deleteAddressMutation = useDeleteAddress();

  const [showForm, setShowForm] = useState(false);

  const [editingAddress, setEditingAddress] = useState<Address | undefined>();

  const [deleteError, setDeleteError] = useState<string | null>(null);

  const isFormSubmitting =
    createAddressMutation.isPending || updateAddressMutation.isPending;

  const handleAddAddress = () => {
    setDeleteError(null);
    setEditingAddress(undefined);
    setShowForm(true);
  };

  const handleEditAddress = (address: Address) => {
    setDeleteError(null);
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleCreateAddress = (values: CreateAddressPayload) => {
    createAddressMutation.mutate(values, {
      onSuccess: () => {
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
        onSuccess: () => {
          setShowForm(false);
          setEditingAddress(undefined);
        },
      },
    );
  };

  const handleDeleteAddress = async (addressId: string) => {
    const address = addresses.find((item) => item.id === addressId);

    const confirmed = window.confirm(
      `Are you sure you want to delete the address for ${
        address?.fullName ?? "this address"
      }?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleteError(null);

      await deleteAddressMutation.mutateAsync(addressId);

      if (editingAddress?.id === addressId) {
        setEditingAddress(undefined);
        setShowForm(false);
      }
    } catch (error) {
      setDeleteError(
        error instanceof Error ? error.message : "Unable to delete address.",
      );
    }
  };

  const handleCancelForm = () => {
    if (isFormSubmitting) {
      return;
    }

    setShowForm(false);
    setEditingAddress(undefined);
  };

  if (isLoading) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="mb-6">
          <h2 className="text-base font-bold text-slate-900">
            Saved Addresses
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            Manage your saved delivery addresses.
          </p>
        </div>

        <AccountAddressSkeleton />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="mb-6">
          <h2 className="text-base font-bold text-slate-900">
            Saved Addresses
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            Manage your saved delivery addresses.
          </p>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50/50 px-6 py-10 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white text-red-500 shadow-xs">
            <AlertCircle className="h-5 w-5" />
          </div>

          <h3 className="mt-4 text-sm font-bold text-slate-900">
            Unable to load addresses
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Something went wrong while loading your saved addresses.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Saved Addresses
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            Manage your saved delivery addresses.
          </p>
        </div>

        {!showForm && (
          <button
            type="button"
            onClick={handleAddAddress}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Add Address
          </button>
        )}
      </div>

      {/* Delete error */}
      {deleteError && (
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{deleteError}</span>
        </div>
      )}

      {/* Add / Edit Form */}
      {showForm ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-6">
          <div className="mb-5 border-b border-slate-200/60 pb-4">
            <h3 className="text-base font-bold text-slate-900">
              {editingAddress ? "Edit address" : "Add new address"}
            </h3>

            <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
              Enter your complete delivery address details below.
            </p>
          </div>

          <AddressForm
            address={editingAddress}
            isSubmitting={isFormSubmitting}
            onSubmit={
              editingAddress ? handleUpdateAddress : handleCreateAddress
            }
            onCancel={handleCancelForm}
          />
        </div>
      ) : (
        <>
          {/* Empty state */}
          {addresses.length === 0 ? (
            <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 px-6 py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <MapPin className="h-6 w-6" />
              </div>

              <p className="mt-3 text-sm font-medium text-slate-800">
                You don&apos;t have any saved addresses.
              </p>

              <p className="mt-1 max-w-xs text-xs text-slate-500">
                Add an address to make your checkout process faster.
              </p>

              <button
                type="button"
                onClick={handleAddAddress}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
              >
                <Plus className="h-4 w-4" />
                Add your first address
              </button>
            </div>
          ) : (
            /* Address list */
            <div className="mt-6 space-y-3">
              {addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  onEdit={handleEditAddress}
                  onDelete={handleDeleteAddress}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
