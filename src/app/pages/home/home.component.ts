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

  async ngOnInit() {
    const pokemon = await this.pokemonService.list()
    const randomIndex = Math.floor(Math.random() * pokemon.length) 
    this.pokemon = pokemon.slice(randomIndex, randomIndex + 4)

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
}
