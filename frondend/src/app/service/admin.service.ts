import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }
  httpClient = inject(HttpClient);

  API_URL = 'http://34.224.86.89:3000/books';

  createBook(
    Title: string, 
    Author: string, 
    Price: number, 
    Currency: string, 
    Available: boolean,
    Items: number, 
    Picture: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append("Title", Title); 
    formData.append("Author", Author);
    formData.append("Price", Price.toString());
    formData.append("Currency", Currency);
    formData.append("Available", Available.toString());
    formData.append("Items", Items.toString());
    formData.append("Picture", Picture);

    console.log('Form data being sent:', {
      Title, Author, Price, Currency, Available, Items, Picture
    });

    return this.httpClient.post(this.API_URL, formData);
  }

  getBooks(): Observable<any> {
    return this.httpClient.get(this.API_URL);
  }

  updateBook(id: string, updatedBookData: any): Observable<any> {
    return this.httpClient.put(`${this.API_URL}/${id}`, updatedBookData);
  }

  deleteBook(id: string): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/${id}`);
  }
}