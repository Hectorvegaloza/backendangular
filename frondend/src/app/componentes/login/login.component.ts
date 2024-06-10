import { Component } from '@angular/core';
import {
  ReactiveFormsModule,   //// para usar fromularios reactivos en angular
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Credential } from '../../interfaces/credential';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule], // este modulo se debe importar
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentialsForm = new FormGroup({ //creamos un objeto
    username: new FormControl('', Validators.required), // estamos activando los validadores y devueve un false si no se cumple
    password: new FormControl('', Validators.required),
  });

  handleSubmit() {
    console.log("estoy trabajando");
    if (this.credentialsForm.valid) {   /* valida que los datos enviados sean correctos  */
      const username = this.credentialsForm.value.username;
      const password = this.credentialsForm.value.password;
      /* si son validos se debe de validar que sean string y haya datos */
      if (typeof username === 'string' && typeof password === 'string') {
        const credential: Credential = {
          username,
          password,
        };
        console.log('credencial: ', credential); /* imprime el tipo de dato y el valor */
      }
    } else {
      console.log('Error: formulario invalido');
    }
  }
}
