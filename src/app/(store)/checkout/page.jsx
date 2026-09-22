
import ProtectedRoute from "@/components/auth/protected-route";

function CheckOutContent() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
            <h1 className="text-3xl font-bold">
                Checkout Page
            </h1>

            <p className="mt-3 text-gray-600">
                check the product and it configuration.
            </p>
        </section>
    );
}


export default function CheckOutPage() {
    return (
        <ProtectedRoute>
            <CheckOutContent />
        </ProtectedRoute>
    )
}

