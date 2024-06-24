import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent {
  registrationForm: FormGroup;
  registrationSuccess = false;

  toastrservice = inject(ToastrService);
  privateRouter = inject(Router);

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registrationForm?.valid) {
      const formData = this.registrationForm.value;
  
      if (this.registrationForm?.get('name')?.invalid) {
        this.toastrservice.error('El nombre es requerido y debe tener al menos 4 caracteres.');
      } else if (this.registrationForm?.get('password')?.invalid) {
        this.toastrservice.error('La contraseña debe cumplir con los requisitos de seguridad.');
      } else {
        this.userService.createUser(formData)
          .subscribe((response) => {
            if (response.resultado === 'bien') {
              console.log('User created successfully:', response.datos);
              this.registrationSuccess = true;
              this.toastrservice.success(
                '¡Usuario creado exitosamente!'
              );
              this.privateRouter.navigate(['/login']);
            } else {
              console.error('Error creating user:', response.mensaje);
              console.log('error: ', Error);
            }  this.toastrservice.error(
              'Hubo un error al crear el usuario'
            );
          });
      }
    }
  } 
}

