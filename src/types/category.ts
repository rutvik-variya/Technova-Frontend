
export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string | null;
    createdAt?: string;
    updatedAt?: string;
}

export type CategoriesResponse = Category[];

export interface CreateCategoryPayload {
    name: string;
    description?: string;
    image?: string;
}

export type UpdateCategoryPayload = Partial<CreateCategoryPayload>;
