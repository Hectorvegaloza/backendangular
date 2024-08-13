import { createAction,props } from "@ngrx/store";
import { productmodel } from "../interfaces/productmodel";

export const addProduct = createAction(
    "[ShopComponent] Add product",
    props <{product: productmodel}>()
)

export const removeProduct = createAction(
    "[cartcomponent] cerra product",
    props <{ProductId: String ,Price:number}>()
)


export const emptyCart = createAction(
    "[cartcomponent] remove all products"
)