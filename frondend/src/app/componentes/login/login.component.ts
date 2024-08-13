import { Component, inject  } from '@angular/core';
import {
  ReactiveFormsModule,   //// para usar fromularios reactivos en angular
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Credential } from '../../interfaces/credential';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../../service/login.service';

const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule], // este modulo se debe importar
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  router = inject(Router);
  loginService: LoginService = inject(LoginService);

  credentialsForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  handleSubmit() {
    
    if (this.credentialsForm.valid) {   /* valida que los datos enviados sean correctos  */
      const username = this.credentialsForm.value.username;
      const password = this.credentialsForm.value.password;
      /* si son validos se debe de validar que sean string y haya datos */
      if (typeof username === 'string' && typeof password === 'string') {
        const credential: Credential = {
          username,
          password,
        };
        
        this.loginService.login(credential).subscribe((response: any) => {
          //console.log('response: ', response);
          //const decoded = jwtHelperService.decodeToken(response.datos);
          //console.log('decoded: ', decoded);
          localStorage.setItem('token', response.datos);
          if(username==="administrador@gmail.com"&& password==="Clave123@" ){

          this.router.navigateByUrl('/book-form');}
          else{
            this.router.navigateByUrl('/shop');
          }
        }); /* imprime el tipo de dato y el valor */
      }
    } else {
      console.log('Error: formulario invalido');
    }
  }
}
