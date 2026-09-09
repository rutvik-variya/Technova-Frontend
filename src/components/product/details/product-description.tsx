interface ProductDescriptionProps {
  description?: string | null;
}

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  if (!description) return null;

  return (
    <section className="mt-16 border-t border-slate-200 pt-12">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
          Overview & Specifications
        </h2>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
          <div className="max-w-none whitespace-pre-line text-sm sm:text-base leading-relaxed text-slate-600">
            {description}
          </div>
        </div>
      </div>
    </section>
  );
}
