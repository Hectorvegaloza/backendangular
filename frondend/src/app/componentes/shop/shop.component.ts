import { Component, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../../service/login.service';
import { response } from 'express';

const jwtHelperService = new JwtHelperService();

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  loginService = inject(LoginService);



  nombre: string = '';
  ngOnInit() {
    const token: any = localStorage.getItem('token');
    console.log('token: ', token);
    if (token) {
      
      this.loginService.validateToken(token).subscribe((response:any)=>{
        console.log("reponse:",response);

        if (response.resultado === "bien") {
          this.nombre = response.datos.name;
          
        } else {
          console.log("no existe token");
        }



      });
      
    } else {
      console.log("no existe token");     
    }
/*     const decoded = jwtHelperService.decodeToken(token);
    console.log('decoded: ', decoded);
    this.nombre = decoded.name; */
  }
}