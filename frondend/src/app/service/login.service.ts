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
  
API_URL='http://34.224.86.89:3000/inicio-sesion';

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
    this.toastrService.info('Bye!');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}