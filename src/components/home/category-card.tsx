import { Category } from "@/types/category";
import Heading from "../ui/heading";

interface CategoryCardProps {
  category: Category[];
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <>
      <Heading
        title="Explore Tech Categories"
        description="Find specialized hardware tailored to your productivity and gaming needs."
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {category.map((cat) => (
          <div key={cat.id}>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600">
              {cat.name}
            </h3>
            <p className="mt-1 text-xs text-slate-500">{cat.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
