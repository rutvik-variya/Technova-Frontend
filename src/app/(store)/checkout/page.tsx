import ProtectedRoute from "@/components/auth/protected-route";
import CheckOutPage from "@/components/checkout/checkout-page"

export default function CheckOut() {
    return (
        <ProtectedRoute>
            <CheckOutPage />
        </ProtectedRoute>
    )
}

