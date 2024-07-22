import { cloneDeep } from "lodash";
import { Cart } from "../models/cart.model";
import { Product, OrderedProduct } from "../models/product.model"

export const addProduct = (cart: Cart, product: Product, quantity: number): Cart => {
    // clone the cart to avoid mutating the state
    const _cart = cloneDeep(cart);
    // check if product is in cart
    const existingProduct = _cart.products.find(({ id }) => product.id === id);
    if (existingProduct) {
        existingProduct.selectedQuantity += quantity
    } else {
        const selectedProduct = _convertToSelectedProduct(product, quantity);
        _cart.products = [..._cart.products, selectedProduct];
    }
    // update cart amount
    _cart.netAmount += product.netPrice * quantity;
    _cart.taxesAmount += product.taxAmount * quantity;
    return _cart;
}

export const removeProduct = (cart: Cart, productId: number): Cart => {
    // clone the cart to avoid mutating the state
    const _cart = cloneDeep(cart);
    const filteredProducts = _cart.products.filter((product) => {
        if (productId === product.id) {
            // update cart amount
            _cart.netAmount -= product.netPrice * product.selectedQuantity;
            _cart.taxesAmount -= product.taxAmount * product.selectedQuantity;
            return false;
        }
        return true;
    });
    return { ..._cart, products: filteredProducts };
}

const _convertToSelectedProduct = (product: Product, selectedQuantity: number): OrderedProduct => {
    return {
        ...product,
        selectedQuantity,
    }
}