import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../service/login.service';
import { AdminService } from '../../service/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditBookModalComponent } from '../edit-book-modal/edit-book-modal.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InfoBookModalComponent } from '../info-book-modal/info-book-modal.component';

@Component({
  selector: 'app-adminn',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './adminn.component.html',
  styleUrl: './adminn.component.css'
})
export class AdminnComponent implements OnInit{
  name: string = ''; // To greet the user

  Title: string = '';
  Author: string = '';
  Price: number = 0;
  Currency: string = '';
  Available: boolean = false;
  Items: number = 0;
  Picture: File | null = null;

  books: any[] = [];

  constructor(
    private toastrService: ToastrService,
    private loginService: LoginService,
    private adminService: AdminService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    const token: any = localStorage.getItem('token');
    if (token) {
      this.loginService.validateToken(token).subscribe({
        next: (response: any) => {
          if (response.resultado === 'bien') {
            this.fetchBooks();
          } else {
            this.loginService.logout();
          }
        },
        error: (error: any) => {
          console.error('Error validating token:', error);
          this.loginService.logout();
        }
      });
    } else {
      this.loginService.logout();
    }
  }

  inputFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.Picture = event.target.files[0];
    }
  }

  handleSubmit() {
    if (this.Picture) {
      this.adminService.createBook(this.Title, this.Author, this.Price, this.Currency, this.Available, this.Items, this.Picture)
        .subscribe({
          next: (response: any) => {
            if (response.success) {
              this.toastrService.success(response.message);
              this.fetchBooks();
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

  fetchBooks() {
    this.adminService.getBooks().subscribe({
      next: (response: any) => {
        console.log("response: ", response)
        if (response.resultado === 'successful' && response.datos) {
          this.books = response.datos;
        } else {
          this.toastrService.error('An error occurred while fetching books');
          console.error('Error in response:', response);
        }
      },
      error: (error: any) => {
        console.error('Error occurred while fetching books:', error);
        this.toastrService.error('An error occurred while fetching books');
      }
    });
  }

  openInfoModal(book: any) {
    const modalRef = this.modalService.open(InfoBookModalComponent, { size: 'lg' }); // 'lg' for large size, adjust as needed
    modalRef.componentInstance.book = book; // Pass the selected book to the modal
  }

  openEditModal(book: any) {
    const modalRef = this.modalService.open(EditBookModalComponent);
    modalRef.componentInstance.book = { ...book }; 

    modalRef.result.then((result: any) => {
      if (result) {
        this.handleUpdate(result._id, result);
      }
    }).catch((error) => {
      console.error('Modal dismissed with error:', error);
    });
  }

  handleUpdate(id: string, updatedData: any) {
    this.adminService.updateBook(id, updatedData).subscribe({
      next: (res: any) => {
        console.log('Response:', res);
        if (res.resultado === 'successful') {
          this.toastrService.success(res.mensaje);
          this.fetchBooks(); 
        } else {
          this.toastrService.error('An error occurred while updating the book');
        }
      },
      error: (error: any) => {
        console.error('Error occurred while updating the book:', error);
        this.toastrService.error('An error occurred while updating the book');
      }
    });
  }

  handleDelete(id: string) {
    this.adminService.deleteBook(id).subscribe({
      next: (res: any) => {
        console.log('Response:', res);
        if (res.resultado === 'successful') {
          this.toastrService.success(res.mensaje);
          this.fetchBooks(); 
        } else {
          this.toastrService.error('An error occurred while deleting the book');
        }
      },
      error: (error: any) => {
        console.error('Error occurred while deleting the book:', error);
        this.toastrService.error('An error occurred while deleting the book');
      }
    });
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
