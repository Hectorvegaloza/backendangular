import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from "../../service/login.service"


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  loginservice = inject(LoginService);
}
