import { createReducer, on } from "@ngrx/store";
import { Cart } from "../models/cart.model";
import { Product, ProductCategory } from "../models/product.model";
import { AddProduct, GetProductCategories, GetProductCategoriesSuccess, GetProducts, GetProductsFailure, GetProductsSuccess, RemoveProduct } from "./actions";
import { addProduct, removeProduct } from "./util";

export interface ProductState {
    loading: boolean;
    cart: Cart;
    products: Product[];
    categories: ProductCategory[];
}

export const InitialState: ProductState = {
    loading: false,
    cart: {
        netAmount: 0,
        taxesAmount: 0,
        products: [],
    },
    categories: [],
    products: []
}

export const productReducer = createReducer(
    InitialState,
    on(GetProducts, GetProductCategories, state => ({ ...state, loading: true })),
    on(GetProductsFailure, state => ({ ...state, loading: false })),
    on(GetProductsSuccess, (state, { products }) => ({ ...state, loading: false, products })),
    on(GetProductCategoriesSuccess, (state, { categories }) => ({ ...state, categories })),
    on(AddProduct, (state, { product, quantity }) => ({ ...state, cart: addProduct(state.cart, product, quantity) })),
    on(RemoveProduct, (state, { id }) => ({ ...state, cart: removeProduct(state.cart, id) }))
);