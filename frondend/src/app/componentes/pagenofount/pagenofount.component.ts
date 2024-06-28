import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagenofount',
  standalone: true,
  imports: [],
  templateUrl: './pagenofount.component.html',
  styleUrl: './pagenofount.component.css'
})
export class PagenofountComponent {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // ... any initialization logic if needed
  }

  goBack() {
    this.router.navigate(['/home']); 
  }
}
