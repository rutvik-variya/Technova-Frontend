export interface VariantAttributesInput {
  attributes?: Record<string, string> | null;
  ram?: string | null;
  storage?: string | null;
  color?: string | null;
}

export function getProductVariantAttributes(
  variant: VariantAttributesInput,
): Record<string, string> {
  const attributes = Object.fromEntries(
    Object.entries(variant.attributes ?? {}).filter(
      ([name, value]) => name.trim() && value.trim(),
    ),
  );

  if (Object.keys(attributes).length > 0) {
    return attributes;
  }

  return Object.fromEntries(
    [
      ["RAM", variant.ram],
      ["Storage", variant.storage],
      ["Color", variant.color],
    ].filter((entry): entry is [string, string] => Boolean(entry[1])),
  );
}
