import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../service/login.service';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent {

  toastrService = inject(ToastrService);
  loginService = inject(LoginService);
  adminService = inject(AdminService);
  router: Router = inject(Router); 

  name: string = ''; 

  Title: string = '';
  Author: string = '';
  Price: number = 0;
  Currency: string = '';
  Available: boolean = false;
  Items: number = 0;
  Picture: File | null = null;

  books: any[] = [];

  inputFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.Picture = event.target.files[0];
    }
  }

  handleSubmit() {
    if (this.Picture) {
      this.adminService
        .createBook(
          this.Title,
          this.Author,
          this.Price,
          this.Currency,
          this.Available,
          this.Items,
          this.Picture
        )
        .subscribe({
          next: (response: any) => {
            console.log("respuesta: ", response)
            if (response.resultado == "successful") {
              this.toastrService.success(response.message);
            } else {
              this.toastrService.error(response.message || 'An error occurred while creating the book');
            }
          },
          error: (error: any) => {
            console.error('Error occurred while creating the book:', error);
            this.toastrService.error('An error occurred while creating the book');
          }
        });
    } else {
      this.toastrService.warning('All fields are required');
    }
  }

  handleClickViewBooks() {
    this.router.navigate(['/admin']); 
  }

  handleClickViewBooks1() {
    this.router.navigate(['/home']); 
  }
  
  ngOnInit() {
    const token: any = localStorage.getItem('token');
    if (token) {
      this.loginService.validateToken(token).subscribe((response: any) => {
        console.log("response: ", response)
        if (response.resultado === 'bien') {
          this.name = response.datos.name;
          this.toastrService.success(`Hola, ${this.name}!`);
        } else {
          this.loginService.logout();
        }
      });
    } else {
      this.loginService.logout();
    }
  }
}
