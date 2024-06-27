import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-info-book-modal',
  standalone: true,
  imports: [],
  templateUrl: './info-book-modal.component.html',
  styleUrl: './info-book-modal.component.css'
})
export class InfoBookModalComponent {
  @Input() book: any;

  constructor(public activeModal: NgbActiveModal) {}

  closeModal() {
    this.activeModal.close();
  }
}