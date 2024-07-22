import { Action, ActionReducer } from "@ngrx/store";
import { productReducer, ProductState } from "./reducer";
import { ProductEffects } from "./effects";

export interface AppStore {
    products: ActionReducer<ProductState, Action>;
}

export const AppStore: AppStore = {
    products: productReducer
}

export const appEffects = [ProductEffects];