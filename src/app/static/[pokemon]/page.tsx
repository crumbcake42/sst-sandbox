import { PokemonCard } from "@/components/PokemonCard";
import PokeAPI from "pokeapi-typescript";

export default async function GsspPokemonPage({
  params: { pokemon: id },
}: {
  params: { pokemon: string };
}) {
  const pokemon = await PokeAPI.Pokemon.resolve(id);
  return <PokemonCard pokemon={pokemon} />;
}

export async function generateStaticParams() {
  const _pokemon = await PokeAPI.Pokemon.list(20);

  return _pokemon.results.map((pokemon) => ({
    pokemon: pokemon.name.toLowerCase(),
  }));
}

export const revalidate = 60; // revalidate this page every 60 seconds
