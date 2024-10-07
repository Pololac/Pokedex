import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth/auth.guard';
import { SearchResultsComponent } from './pages/search-results/search-results.component';


export const routes: Routes = [
    {path: '', canActivate: [authGuard], component: HomeComponent },
    {path: 'search-results', canActivate: [authGuard], component: SearchResultsComponent},
    {path: 'connexion', component: LoginComponent },
    {path: '**', redirectTo: ''}

];
