"use client";

import { PokemonCard } from "@/components/PokemonCard";
import PokeAPI, { IPokemon } from "pokeapi-typescript";
import { useEffect, useState } from "react";

export default function GsspPokemonPage({
  params: { pokemon: id },
}: {
  params: { pokemon: string };
}) {
  const [pokemon, setPokemon] = useState<IPokemon | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async () => {
    setLoading(true);
    const result = await PokeAPI.Pokemon.resolve(id);
    setPokemon(result);
    setLoading(false);
  };

  useEffect(() => {
    if (!loading && (!pokemon || pokemon.name.toLowerCase() !== id)) {
      fetchPokemon();
    }
  }, [id]);
  return !pokemon ? <p>Loading....</p> : <PokemonCard pokemon={pokemon} />;
}
