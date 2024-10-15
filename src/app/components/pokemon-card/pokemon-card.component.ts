import { Component, inject, Input } from '@angular/core';
import { Pokemon } from '../../entities/pokemon.entity';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {
  private readonly router = inject(Router)

  @Input({required: true}) pokemon: Pokemon
  @Input({required: false}) clickable: boolean = true

  navigateToPokemonDetails (pokedexId: number) {
    return this.router.navigate(['/pokemon', pokedexId])
  }
}
