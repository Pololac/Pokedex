import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth/auth.guard';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';


export const routes: Routes = [
    {path: '', redirectTo: 'pokemon', pathMatch:'full' },

    // Débutant
    // { path: 'pokemon', canActivate: [authGuard], component: HomeComponent },
    // { path: 'pokemon/:id', canActivate: [authGuard], component: PokemonDetailsComponent },

    // Intermédiaire
    {
    path: 'pokemon', canActivate: [authGuard], children: [
        { path: '', component: HomeComponent },
        { path: 'edit', component: PokemonDetailsComponent },   // Au même niveau, toujours mettre les routes statiques avant dynamiques
        { path: ':id', component: PokemonDetailsComponent }     // Route dynamique (varie avec l'id)
    ]
    },

    {path: 'search-results', canActivate: [authGuard], component: SearchResultsComponent},
    {path: 'connexion', component: LoginComponent },
    {path: '**', redirectTo: ''}

];
