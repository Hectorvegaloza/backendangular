import { Action, createReducer, on } from '@ngrx/store';
import {addProduct,deleteProduct,emptyCart } from './cart.accions';
import { productmodel } from '../interfaces/productmodel';


export interface CartState { /* NEW BLOCK */
  products: productmodel[],
  grandTotal: number
}

export const initialState: CartState = { /* NEW BLOCK */
  products: [],
  grandTotal: 0
}


export const carritoReducer = createReducer(
  initialState,
  on(addProduct, (state, { product }) => {
    console.log(state)
    return{products: [...state.products, product],
    grandTotal: state.grandTotal + product.Price}
  }),
/*   on(deleteProduct, (state, { ProductIndex, Price }) => ({
    products: state.products.filter((product, index) => index !== ProductIndex),
    grandTotal: state.grandTotal - Price
  })), */
  on (emptyCart,(state)=>({
    products: [],
    grandTotal:0
  }))

);