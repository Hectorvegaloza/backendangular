import { Component, inject } from '@angular/core';
import { AppState } from '../../app.state';
import { select, Store } from '@ngrx/store';
import { productmodel } from '../../interfaces/productmodel';
import { CartState } from '../../ngrxcarrito/cart.reducer';
import { removeProduct } from '../../ngrxcarrito/cart.accions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carritodecompras',
  standalone: true,
  imports: [ RouterLink],
  templateUrl: './carritodecompras.component.html',
  styleUrl: './carritodecompras.component.css'
})
export class CarritodecomprasComponent {
  constructor (private store: Store<AppState>){

  }
  
  productsNGRX:productmodel[]=[];
  totalNGRX:Number = 0
  getProducts(){
    this.store.pipe(select('cartState')).subscribe((state:CartState)=>{
      this.productsNGRX = state.products
      this.totalNGRX = state.grandTotal
    })
  }
  deleteProduct(id: String, Price: number){
    this.store.dispatch(removeProduct({ProductId: id, Price}))

  }
 
  ngOnInit(){
    this.getProducts()
  }
}
