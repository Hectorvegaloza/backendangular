import { NgxPaginationModule } from 'ngx-pagination';
import { Component, NgModule, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../service/login.service';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { addProduct } from '../../ngrxcarrito/cart.accions';
import { productmodel } from '../../interfaces/productmodel';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})

export class ShopComponent implements OnInit {
  books: any[] = [];
  p: number = 1;
  nombre: string = '';
  
  constructor(
    private loginService: LoginService,
    private adminService: AdminService,
    private router: Router,
    private store:Store

  ) {}

  ngOnInit() {
    this.fetchBooks(); // Obtener libros al inicializar el componente

    const token: any = localStorage.getItem('token');
    if (token) {
      this.loginService.validateToken(token).subscribe((response: any) => {
        if (response.resultado === 'bien') {
          this.nombre = response.datos.name;
        } else {
          this.loginService.logout();
        }
      });
    } else {
      this.loginService.logout();
    }
  }

  redirectToPayment() {

    /* this.router.navigate(['/payment']); *//* aqui se debe de poner */
  }

addtocart(product: productmodel){
  this.store.dispatch(addProduct({product}))
}

  fetchBooks() {
    this.adminService.getBooks().subscribe({
      next: (response: any) => {
        if (response.resultado === 'successful' && response.datos) {
          this.books = response.datos;
        } else {
          console.error('Error fetching books:', response);
        }
      },
      error: (error: any) => {
        console.error('Error fetching books:', error);
      }
    });
  }


}