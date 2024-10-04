import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth/auth.guard';


export const routes: Routes = [
    {path: '', canActivate: [authGuard], component: HomeComponent },
    {path: 'connexion', component: LoginComponent },
    {path: '**', redirectTo: ''}

];
