import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface UserData {
  nombre: string;
  correo: string;
  mensaje: string;
 }

@Injectable({
  providedIn: 'root'
})

export class ContactenosService {
  constructor(private http: HttpClient) {}
  httpClient = inject(HttpClient);

  Api='http://34.224.86.89:3000/contactenos';

  creandocontacto(userdata: UserData) {
    console.log("enviado",userdata);

    return this.httpClient.post(
      this.Api,
      userdata,
    );
  }
 
}


