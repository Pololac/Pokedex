export interface PokemonHttp {
    pokedex_id: number,
    generation: number,
    category: string,
    name: {
      fr: string,
      en: string,
      jp: string
    },
    sprites: {
      regular: string,
      shiny: string | null,
      gmax: string | null
    },
    types: {
      name: string,
      image: string
    }[] | null,
    talents: {
      name: string,
      tc: boolean
    }[] | null,
    stats: {
      hp: number,
      atk: number,
      def: number,
      spe_atk: number,
      spe_def: number,
      vit: number
    } | null,
    resistances: {
      name: string,
      multiplier: number
    }[] | null,
    evolution: {
      pre:
        {
          pokedex_id: number,
          name: string,
          condition: string
        }[] | null,
      next:
        {
          pokedex_id: number,
          name: string,
          condition: string
        }[] | null,
      mega: {
        orbe: string,
        sprites: {
          regular: string | null,
          shiny: string | null
        }
      }[] | null
    } | null,
    height: string | null,
    weight: string | null,
    egg_groups: string[] | null,
    sexe: {
      male: number,
      female: number
    } | null,
    catch_rate: number | null,
    level_100: number | null,
    formes:
      {
        region: string,
        name: {
          fr: string,
          en: string,
          jp: string
        }
      }[] | null
  }
  
  export interface Pokemon {
    pokedexId: number,
    generation: number,
    category: string,
    name: string,
    sprite: string,
    types: {
      name: string,
      image: string
    }[] | null,
    stats: {
      hp: number,
      atk: number,
      def: number,
      speAtk: number,
      speDef: number,
      vit: number
    } | null,
    height: string | null,
    weight: string | null
  }
  
  export namespace Pokemon {
    export function fromHttp(pokemonHttp: PokemonHttp): Pokemon {
      return {
        pokedexId: pokemonHttp.pokedex_id,
        generation: pokemonHttp.generation,
        category: pokemonHttp.category,
        name: pokemonHttp.name.fr,
        sprite: pokemonHttp.sprites.regular,
        types: pokemonHttp.types,
        stats: pokemonHttp.stats ? {
          hp: pokemonHttp.stats.hp,
          atk: pokemonHttp.stats.atk,
          def: pokemonHttp.stats.def,
          speAtk: pokemonHttp.stats.spe_atk,
          speDef: pokemonHttp.stats.spe_def,
          vit: pokemonHttp.stats.vit
        } : null,
        height: pokemonHttp.height,
        weight: pokemonHttp.weight
      }
    }
  }
  