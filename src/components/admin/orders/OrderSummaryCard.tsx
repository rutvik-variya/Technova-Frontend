interface Props {
  subtotal: number;
  discount: number;
  shippingCharge: number;
  tax: number;
  grandTotal: number;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);

export default function OrderSummaryCard({
  subtotal,
  discount,
  shippingCharge,
  tax,
  grandTotal,
}: Props) {
  const rows = [
    { label: "Subtotal", amount: subtotal },
    { label: "Discount", amount: -discount },
    { label: "Shipping", amount: shippingCharge },
    { label: "Tax", amount: tax },
  ];

  return (
    <section className="ml-auto w-full max-w-md rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="font-semibold text-gray-900">Order summary</h2>

      <div className="mt-4 space-y-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex justify-between gap-4 text-sm text-gray-600"
          >
            <span>{row.label}</span>
            <span>{formatCurrency(row.amount)}</span>
          </div>
        ))}

        <div className="flex justify-between gap-4 border-t border-gray-200 pt-4 font-bold text-gray-900">
          <span>Grand total</span>
          <span>{formatCurrency(grandTotal)}</span>
        </div>
      </div>
    </section>
  );
}
