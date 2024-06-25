import { NgxPaginationModule } from 'ngx-pagination';
import { Component, NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../service/login.service';



@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})

export class ShopComponent {

  books: any[] = [
    { title: 'El Reto', authors: ['Pilar Burgos', 'David Liston'], price: 45000, imagePath: '/assets/Books/book1.jpg' },
    { title: 'The Princess and the Goblin', authors: ['George MacDonald'], price: 50000, imagePath: '../../../assets/Books/book2.jpg' },
    { title: 'The Unknown Game', authors: ['TwoHairs'], price: 45000, imagePath: '../../../assets/Books/book3.jpg'},
    { title: 'Lilis Lost Purr', authors: ['India Redman'], price: 50000, imagePath: '../../../assets/Books/book4.jpg' },
    { title: 'Eli & Gaston', authors: ['Ludovic Villain'], price: 48000, imagePath: '../../../assets/Books/book5.jpg' },
    { title: 'Adventure Time', authors: ['Unknown'], price: 55000, imagePath: '../../../assets/Books/book6.jpg' },
    { title: 'Wait Where the Shooting Star Falls', authors: ['Unknown'], price: 47000, imagePath: '../../../assets/Books/book7.jpg' },
    { title: 'Charlottes Web', authors: ['E.B White'], price: 50000, imagePath: '../../../assets/Books/book8.jpg' },
    { title: 'Magalina', authors: ['Sylvia Douye'], price: 35000, imagePath: '../../../assets/Books/book9.jpg' },
    { title: 'Xiaobijianer', authors: ['Unknown'], price: 45000, imagePath: '../../../assets/Books/book10.jpg' },
    { title: 'The Jungle', authors: ['Rudyard Kipling'], price: 55000, imagePath: '../../../assets/Books/book11.jpg' },
    { title: 'Onibi', authors: ['Atelier Sento'], price: 40000, imagePath: '../../../assets/Books/book12.jpg' },
    { title: 'The Secret Ingredient', authors: ['Unknown'], price: 45000, imagePath: '../../../assets/Books/book13.jpg' },
    { title: 'Des Lumieres dans la Nuit', authors: ['Lorena Alvarez'], price: 48000, imagePath: '../../../assets/Books/book14.jpg' },
    { title: 'Penny and the Mist Monsters', authors: ['Unknown'], price: 50000, imagePath: '../../../assets/Books/book15.jpg' },
    { title: 'Brume', authors: ['Jérome Pelissier'], price: 60000, imagePath: '../../../assets/Books/book16.jpg' },
    { title: 'Princess Mononoke', authors: ['Hayao Miyazaki'], price: 35000, imagePath: '../../../assets/Books/book17.jpg' },
    { title: 'Los Tres Chanchitos', authors: ['Mariana Ruiz Johnson'], price: 45000, imagePath: '../../../assets/Books/book18.jpg' },
    { title: 'The Wood', authors: ['John Lewis-Stempel'], price: 65000, imagePath: '../../../assets/Books/book19.jpg' },
    { title: 'Arthur and the Golden Rope', authors: ['Joe Todd Stanton'], price: 55000, imagePath: '../../../assets/Books/book20.jpg' },
    { title: 'Green on Green', authors: ['Dianne White'], price: 38000, imagePath: '../../../assets/Books/book21.jpg' },
    { title: 'Alices Adventures in Wonderland', authors: ['Lewis Carroll'], price: 55000, imagePath: '../../../assets/Books/book22.jpg' },
    { title: 'El Arca de Noelia', authors: ['Txabi Arnal'], price: 45000, imagePath: '../../../assets/Books/book23.jpg' },
    { title: 'Carretera al Mar', authors: ['Ángela Cuartas'], price: 55500, imagePath: '../../../assets/Books/book24.png' },
    { title: 'Mina', authors: ['Matthew Forsythe'], price: 73000, imagePath: '../../../assets/Books/book25.png' },
    { title: '¡Corre, Lobo, Corre!', authors: ['Coralie Saudo'], price: 96000, imagePath: '../../../assets/Books/book26.png' },
    { title: 'The Hobbit', authors: ['JRR Tolkien'], price: 58000, imagePath: '../../../assets/Books/book27.jpg' },
    { title: 'Señor Aburrimiento', authors:[ 'Pedro Mañas & David S. Listón'], price: 50000, imagePath: '../../../assets/Books/book28.jpg' },
    { title: 'On a Cold Day', authors: ['Sumitra'], price: 40000, imagePath: '../../../assets/Books/book29.jpg' },
    { title: 'Picasso & Lump', authors: ['Nancy Lim'], price: 45000, imagePath: '../../../assets/Books/book30.jpg' }, 
  ];

  p: number = 1;
  




  loginService = inject(LoginService);
  nombre: string = '';
  ngOnInit() {
    const token: any = localStorage.getItem('token');
    /* console.log('token: ', token); */
    if (token) {
      
      this.loginService.validateToken(token).subscribe((response:any)=>{
        /* console.log("reponse:",response); */

        if (response.resultado === "bien") {
          this.nombre = response.datos.name;
          
        } else {
          this.loginService.logout();/* para cerrar sesion */
        }



      });
      
    } else {
      this.loginService.logout();     
    }
/*     const decoded = jwtHelperService.decodeToken(token);
    console.log('decoded: ', decoded);
    this.nombre = decoded.name; */
  }
}