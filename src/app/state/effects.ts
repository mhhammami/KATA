import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../services/product.service";
import { GetProductCategories, GetProductCategoriesFailure, GetProductCategoriesSuccess, GetProducts, GetProductsFailure, GetProductsSuccess } from "./actions";
import { catchError, concatMap, of, switchMap } from "rxjs";
import { Product, ProductCategory } from "../models/product.model";
import { CategoriesService } from "../services/category.service";
import { TaxonomyService } from "../services/taxonomy.service";

@Injectable()
export class ProductEffects {
    constructor(
        private readonly $actions: Actions,
        private readonly productService: ProductService,
        private readonly categoriesService: CategoriesService,
        private readonly taxonomyService: TaxonomyService,
    ) { }

    $getCategories = createEffect(() =>
        this.$actions.pipe(
            ofType(GetProductCategories),
            switchMap(() => {
                return this.categoriesService.getCategories().pipe(
                    concatMap((categories: ProductCategory[]) => {
                        return [GetProductCategoriesSuccess({ categories }), GetProducts({ categories })];
                    }),
                    catchError(() => of(GetProductCategoriesFailure))
                )
            }),
        )
    )

    $getProducts = createEffect(() =>
        this.$actions.pipe(
            ofType(GetProducts),
            switchMap(({ categories }) => {
                return this.productService.getProducts().pipe(
                    concatMap((products: Product[]) => {
                        return [GetProductsSuccess({ products: this.taxonomyService.apply(products, categories) })];
                    }),
                    catchError(() => of(GetProductsFailure))
                )
            }),
        )
    )
}