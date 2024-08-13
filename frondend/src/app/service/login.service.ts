import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Credential } from '../interfaces/credential';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}
  toastrService = inject(ToastrService);
  httpClient = inject(HttpClient);
  router = inject(Router);
  
API_URL='http://localhost:3000/inicio-sesion';

  login(credential: Credential) {
    return this.httpClient.post(
      this.API_URL,
      credential
    );
  }

  validateToken(token:string){
    return this.httpClient.get(`${this.API_URL}/${token}`)}

  isLogin() {
    if (localStorage.getItem('token')) {
      return true;

    } else {
      return false;
      
    }
  }
  
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    this.toastrService.warning('Haz cerrado Sesión','Hasta pronto', {
      positionClass: 'toast-top-center',
      timeOut: 2000, 
      closeButton: true 
  }); 
  }
}

