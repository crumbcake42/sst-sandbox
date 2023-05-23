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
