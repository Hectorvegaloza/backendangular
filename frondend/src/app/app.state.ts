import { CartState } from "./ngrxcarrito/cart.reducer";

export interface AppState {
 readonly cartState: CartState;
}