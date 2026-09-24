"use client";

import type { Address } from "@/types/address";

import { AddressCard } from "./address-card";

interface AddressListProps {
  addresses: Address[];
  selectedAddressId?: string;
  onSelect?: (addressId: string) => void;
  onEdit?: (address: Address) => void;
  onDelete?: (addressId: string) => void;
  onSetDefault?: (addressId: string) => void;
}

export function AddressList({
  addresses,
  selectedAddressId,
  onSelect,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressListProps) {
  return (
    <div className="space-y-3">
      {addresses.map((address) => (
        <AddressCard
          key={address.id}
          address={address}
          selected={selectedAddressId === address.id}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
          onSetDefault={onSetDefault}
        />
      ))}
    </div>
  );
}
