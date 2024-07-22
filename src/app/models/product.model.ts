export interface Product {
  id: number;
  productName: string;
  netPrice: number;
  taxAmount: number;
  quantity: number;
  isImported: boolean;
  category: ProductCategoryName;
}

export interface ProductCategory {
  name: ProductCategoryName;
  tax: number;
}

export enum ProductCategoryName {
  Medecine = "Medecine",
  Food = "Food",
  Books = "Books",
  Electric = "Electric",
  Fragrance = "Fragrance"
}

export type OrderedProduct = Product & { selectedQuantity: number };