import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { Pokemon } from '../../entities/pokemon.entity';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { PokemonCardComponent } from "../../components/pokemon-card/pokemon-card.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [PokemonCardComponent, NgIf],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent implements OnInit {
  private readonly pokemonService = inject(PokemonService)

  @Input( {required: true, transform: numberAttribute} ) id: number

  pokemon: Pokemon

  async ngOnInit(){
    this.pokemon = await this.pokemonService.getByPokedexId(this.id)
  }
}
