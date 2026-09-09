import ProductDetails from "@/components/product/details/product-details";

interface ProductDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <ProductDetails slug={slug} />
    </main>
  );
}
