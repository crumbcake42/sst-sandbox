import PokeAPI from "pokeapi-typescript";
import { PokemonCard } from "@/components/PokemonCard";

export default async function GsspPokemonPage() {
  const pokemon = await PokeAPI.Pokemon.resolve(
    Math.floor(Math.random() * 1005)
  );

  return <PokemonCard pokemon={pokemon} />;
}

export const revalidate = 60; // revalidate this page every 60 seconds
