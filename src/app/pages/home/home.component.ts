import { Component, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { Pokemon } from '../../entities/pokemon.entity';
import { NgForOf, NgIf } from '@angular/common';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PokemonCardComponent,
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly pokemonService = inject(PokemonService)
  private readonly router = inject(Router)

  searchForm: FormGroup
  pokemon: Pokemon[]
  selectedPokemon: Pokemon[]

  async ngOnInit() {
    this.pokemon = await this.pokemonService.list()
    // Suppression du Pokémon avec l'ID "0" (MissingNo)
    this.deletePokemonById(0);
    //Afficher seulement les 100 premiers pokemons
    this.pokemon = this.pokemon.slice(0, 50)

    const randomIndex = Math.floor(Math.random() * this.pokemon.length) 
    this.selectedPokemon = this.pokemon.slice(randomIndex, randomIndex + 4)



    this.searchForm = new FormGroup({
      search: new FormControl('', [
        Validators.minLength(3),
        Validators.required
      ])
    })
  }

  onSubmitSearch() {
    if (this.searchForm.invalid) {
      return;
    }
    
    const { search } = this.searchForm.value
    
    // localhost:4200/pokemon?s=pikachu

    // this.router.navigateByUrl('/pokemon?s=${search}')
    this.router.navigate(['/search-results'], {queryParams: { s:search }})

  }

  // Méthode pour supprimer un Pokémon par son ID
  deletePokemonById(id: number): void {
    const index = this.pokemon.findIndex(pokemon => pokemon.pokedexId === id);
    
    if (index !== -1) {
      this.pokemon.splice(index, 1);  // Supprime l'élément trouvé
    } else {
      console.log('Pokémon non trouvé avec l\'ID:', id);
    }
  }
}
