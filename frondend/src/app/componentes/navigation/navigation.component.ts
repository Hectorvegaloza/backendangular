import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from "../../service/login.service"
import { select, Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { CartState } from '../../ngrxcarrito/cart.reducer';
import { productmodel } from '../../interfaces/productmodel';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  constructor (private store:Store<AppState>){

  }
  
  productsNGRX:productmodel[]=[];
  
  getProducts(){
    this.store.pipe(select('cartState')).subscribe((state:CartState)=>{
      this.productsNGRX = state.products
    })
  }
  loginservice = inject(LoginService);
  ngOnInit(){
    this.getProducts()
  }
}
