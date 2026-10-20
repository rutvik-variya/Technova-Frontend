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
    <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <h2 className="text-sm font-bold text-slate-950 border-b border-slate-100 pb-4">
        Order Summary
      </h2>

      <div className="mt-4 space-y-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex justify-between gap-4 text-xs font-medium text-slate-600"
          >
            <span>{row.label}</span>
            <span>{formatCurrency(row.amount)}</span>
          </div>
        ))}

        <div className="flex justify-between gap-4 border-t border-slate-100 pt-4 text-sm font-extrabold text-slate-900">
          <span>Grand Total</span>
          <span>{formatCurrency(grandTotal)}</span>
        </div>
      </div>
    </section>
  );
}
