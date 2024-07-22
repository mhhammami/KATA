import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./reducer";
import { Cart } from "../models/cart.model";
import { OrderedProduct, Product, ProductCategory } from "../models/product.model";

// global
export const selectState = createFeatureSelector<ProductState>('products');
export const SelectLoading = createSelector(selectState, (state: ProductState) => state.loading);
// cart
export const SelectCart = createSelector(selectState, (state: ProductState) => state.cart);
export const SelectCartProductCount = createSelector(SelectCart, (cart: Cart) => {
    return cart.products.reduce((acc, curr) => acc + curr.selectedQuantity, 0);
});
// products
export const SelectProducts = createSelector(selectState, (state: ProductState) => state.products);
export const SelectOrderedProducts = createSelector(SelectCart, (cart: Cart) => cart.products);
export const SelectAvailableProducts = createSelector(
    SelectProducts,
    SelectOrderedProducts,
    (all: Product[], ordered: OrderedProduct[]) => {
        return all.map((product: Product) => {
            const orderedProduct = ordered.find(({ id }) => id === product.id);
            return { ...product, quantity: product.quantity - (orderedProduct?.selectedQuantity || 0) }
        })
    }
)
// categories
export const SelectCategories = createSelector(selectState, (state: ProductState) => state.categories);
export const SelectCategoryNames = createSelector(SelectCategories, (categories: ProductCategory[]) => categories.map(({ name }) => name));