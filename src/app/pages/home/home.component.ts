import { Component, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { Pokemon } from '../../entities/pokemon.entity';
import { NgForOf } from '@angular/common';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PokemonCardComponent,
    NgForOf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly pokemonService = inject(PokemonService)

  pokemon: Pokemon[]

  async ngOnInit() {
    this.pokemon = await this.pokemonService.list()
    this.pokemon = this.pokemon.slice(1, 100)
    console.log(this.pokemon)
  }
}
