import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './componentes/navigation/navigation.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
