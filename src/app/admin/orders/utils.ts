
export const formatCurrency = (amount: string | number) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(Number(amount));

export const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

export const getStatusClass = (status: string) => {
    switch (status) {
        case "DELIVERED":
        case "PAID":
            return "bg-green-100 text-green-700";
        case "PROCESSING":
        case "SHIPPED":
            return "bg-blue-100 text-blue-700";
        case "CANCELLED":
        case "FAILED":
        case "RETURNED":
            return "bg-red-100 text-red-700";
        case "PENDING":
            return "bg-amber-100 text-amber-700";
        case "REFUNDED":
            return "bg-purple-100 text-purple-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};
