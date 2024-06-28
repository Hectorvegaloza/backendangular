import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentModalService } from '../../service/payment-modal.service';
import { ToastrService } from 'ngx-toastr';

interface PaymentResponse {
  answer: string;
  message: string;
  info: any;
}

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent {
  registrationSuccess = false;
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private paymentService: PaymentModalService,
    private toastrservice: ToastrService,
    private router: Router
  ) {
    this.registrationForm = this.formBuilder.group({
      card_number: ['', Validators.required],
      cvc: ['', Validators.required],
      expiration_date: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]],
    });
  }

  handleClickGoBack() {
    this.router.navigate(['/shop']); 
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;

      this.paymentService.createPayment(formData).subscribe(
        (response) => {
          if (response.answer === 'worked') {
            this.registrationSuccess = true;
            this.toastrservice.success('¡Su pago ha sido registrado!');
          } else {
            console.error('Error creating payment:', response);
            this.toastrservice.error('Hubo un error');
          }
        },
        (error) => {
          console.error('Error:', error);
          this.toastrservice.error('Hubo un error al comunicarse con el servidor.');
        }
      );
    } else {
      this.toastrservice.error('Por favor, complete todos los campos correctamente.');
    }
  }
}