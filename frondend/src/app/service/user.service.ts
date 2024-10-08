import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UserData {
 nombre: string;
 correo: string;
 contrasenia: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(userData: UserData) {
    const apiUrl = 'http://54.226.241.14:3000/usuarios'; 
    return this.http.post<any>(apiUrl, userData);
  }
}