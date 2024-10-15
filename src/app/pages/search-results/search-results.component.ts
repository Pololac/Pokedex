import { NgForOf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { Pokemon } from '../../entities/pokemon.entity';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    NgForOf,
    PokemonCardComponent
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent implements OnInit{
  private readonly pokemonService = inject(PokemonService)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly router = inject(Router)

  pokemon: Pokemon[]

  async ngOnInit(): Promise<void> {
    const search = this.activatedRoute.snapshot.queryParamMap.get('s')
    if(!search || search.length < 3){
      this.router.navigateByUrl('/')
      return
    }

    // OPTIMISATION : faire la recherche directement en BDD et non pas côté Angular comme ici
    const pokemon = await this.pokemonService.list()
    this.pokemon = pokemon.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  }
}
