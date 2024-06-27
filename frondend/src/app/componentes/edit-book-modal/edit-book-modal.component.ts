import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-book-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-book-modal.component.html',
  styleUrl: './edit-book-modal.component.css'
})
export class EditBookModalComponent {
    @Input() book: any;

    Title: string = '';
    Author: string = '';
    Price: number = 0;
    Currency: string = '';
    Available: boolean = false;
    Items: number = 0;
    Picture: File | null = null;

    books: any[] = [];
  
    constructor(public activeModal: NgbActiveModal,
                private adminService: AdminService) 
                {}
  
    closeModal() {
      this.activeModal.close();
    }
  
    saveChanges() {
      this.adminService.updateBook(this.book._id, this.book).subscribe({
        next: (res: any) => {
          console.log('Libro actualizado en el servidor:', res);
          this.activeModal.close(this.book); 
        },
        error: (error: any) => {
          console.error('Error al actualizar el libro:', error);
        }
      });
    }
  }