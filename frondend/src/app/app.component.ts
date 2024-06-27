import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './componentes/navigation/navigation.component';
import { FooterComponent } from './componentes/footer/footer.component';  
import { AnimacionesComponent } from './componentes/animaciones/animaciones.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavigationComponent,FooterComponent,AnimacionesComponent,NgxPaginationModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
