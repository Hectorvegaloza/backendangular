import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UserData {
 name: string;
 email: string;
 password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(userData: UserData) {
    const apiUrl = 'http://localhost:3002/usuarios'; 
    return this.http.post<any>(apiUrl, userData);
  }
}