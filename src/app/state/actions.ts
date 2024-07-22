import { createAction, props } from "@ngrx/store";
import { Product, ProductCategory } from "../models/product.model";

// products actions
export const GetProducts = createAction('[Product] Get Products', props<{ categories: ProductCategory[] }>());
export const GetProductsSuccess = createAction('[Product] Get Products Success', props<{ products: Product[] }>());
export const GetProductsFailure = createAction('[Product] Get Products Failure');
// categories actions
export const GetProductCategories = createAction('[Product] Get Products Categories');
export const GetProductCategoriesSuccess = createAction('[Product] Get Products Categories Success', props<{ categories: ProductCategory[] }>());
export const GetProductCategoriesFailure = createAction('[Product] Get Products Categories Failure');
// cart actions
export const AddProduct = createAction('[Product] Add Product', props<{ product: Product, quantity: number }>());
export const RemoveProduct = createAction('[Product] Remove Product', props<{ id: number }>());