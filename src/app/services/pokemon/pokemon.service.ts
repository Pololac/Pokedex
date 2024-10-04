import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Pokemon, PokemonHttp } from '../../entities/pokemon.entity';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly http = inject(HttpClient)


  async list(): Promise<Pokemon[]> {
    const req = this.http.get<PokemonHttp[]>('https://tyradex.vercel.app/api/v1/pokemon')
    // Transforme req ("observable") to promise
    const pokemonHttp = await lastValueFrom(req)
    // Transforme données brutes reçues en données filtrées via fonction fromHttp() définie dans Pokemon.entity
    return pokemonHttp.map(pHttp => Pokemon.fromHttp(pHttp))
  }
}
