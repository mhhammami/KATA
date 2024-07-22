import { OrderedProduct } from "./product.model";

export interface Cart {
    products: OrderedProduct[];
    netAmount: number;
    taxesAmount: number;
}