import { Routes } from '@angular/router';
import { activateGuard } from './guards/activate.guard';
import { HomeComponent } from './componentes/home/home.component';           ///vamos a crear todo el enrutamiento de la navegación
import { LoginComponent } from './componentes/login/login.component';
import { ShopComponent } from './componentes/shop/shop.component';
import { ContactenosComponent } from './componentes/contactenos/contactenos.component';
import { CreateAccountComponent } from './componentes/create-account/create-account.component';
import { AnimacionesComponent } from './componentes/animaciones/animaciones.component';
import { SobrenosotrosComponent } from './componentes/sobrenosotros/sobrenosotros.component';
import { PagenofountComponent } from './componentes/pagenofount/pagenofount.component';


export const routes: Routes = [

     /* //creando las rutas con las importaciones */
    {path: 'home', title: "Home",component: HomeComponent},
    {path: 'login', title: "Login",component: LoginComponent},
    {path: 
        'shop', 
        title: "Shop",
        component: ShopComponent,
        canActivate: [activateGuard],
    },
    {path: 'contactenos', title: "Contactenos",component: ContactenosComponent},
    {path: 'sobrenosotros', title: "Sobrenosotros",component: SobrenosotrosComponent},
    {path: 'crear usuario', title: "Crear Usuarios",component: CreateAccountComponent},
    {path: 'animacion', title: "animacion",component: AnimacionesComponent},
    {path: '', redirectTo:"home",pathMatch:"full"}, //redireccionar un componente al Usuario, cuando no ponga una ruta me redirija a la ruta home
    {path:'**', title: "page no encontrada", component: PagenofountComponent}//quiero que verifique si esta entrando a otras rutas 
];
