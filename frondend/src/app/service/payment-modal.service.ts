import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface PaymentData {
  card_number: number;
  cvc: number;
  expiration_date: string;
  email_address: string; 
}

@Injectable({
  providedIn: 'root'
})
export class PaymentModalService {

  constructor(private http: HttpClient) { }

  createPayment(paymentData: PaymentData) {
    return this.http.post<any>('http://34.224.86.89:3000/payments', paymentData);
  }
}