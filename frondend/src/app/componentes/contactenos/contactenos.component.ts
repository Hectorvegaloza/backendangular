import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContactenosService } from '../../service/contactenos.service';

// Assuming you have a contactos interface defined (replace with your actual structure)
interface Contactos {
  nombre: string;
  correo: string;
  mensaje: string;
}

@Component({
  selector: 'app-contactenos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contactenos.component.html',
  styleUrls: ['./contactenos.component.css'],
})
export class ContactenosComponent {
  form: FormGroup;
  contactenosService: ContactenosService = inject(ContactenosService);

  constructor() {
    this.form = new FormGroup({
      nombre: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      mensaje: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value as Contactos; // Cast to Contactos for type safety

      try {
        this.contactenosService.creandocontacto(formData).subscribe(
          (response) => {
            console.log('Data saved successfully!', response);
            // Handle successful response (e.g., show a success message to the user)
          },
          (error) => {
            console.error('Error saving data:', error);
            // Handle errors (e.g., display an error message to the user)
          }
        );
      } catch (error) {
        console.error('Unexpected error:', error);
        // Handle unexpected errors
      }
    } else {
      console.log('Form is invalid');
    }
  }
}