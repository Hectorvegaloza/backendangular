import { createAction,props } from "@ngrx/store";
import { productmodel } from "../interfaces/productmodel";

export const addProduct = createAction(
    "[ShopComponent] Add product",
    props <{product: productmodel}>()
)

export const deleteProduct = createAction(
    "[cartcomponent] cerra product",
    props <{ProductIndex: number}>()
)


export const emptyCart = createAction(
    "[cartcomponent] remove all products"
)