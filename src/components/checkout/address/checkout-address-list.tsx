"use client";

import { CheckoutAddress } from "@/types/checkout";

import { CheckoutAddressCard } from "./checkout-address-card";

interface CheckoutAddressListProps {
  addresses: CheckoutAddress[];
  selectedAddressId?: string;
  onSelect: (addressId: string) => void;
}

export function CheckoutAddressList({
  addresses,
  selectedAddressId,
  onSelect,
}: CheckoutAddressListProps) {
  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <CheckoutAddressCard
          key={address.id}
          address={address}
          selected={address.id === selectedAddressId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
