"use client";

import { PokemonCard } from "@/components/PokemonCard";
import PokeAPI, { IPokemon } from "pokeapi-typescript";
import { useEffect, useState } from "react";

export default function GsspPokemonPage() {
  const [pokemon, setPokemon] = useState<IPokemon | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async () => {
    setLoading(true);
    const result = await PokeAPI.Pokemon.resolve(
      Math.floor(Math.random() * 1005)
    );
    setPokemon(result);
    setLoading(false);
  };

  useEffect(() => {
    if (!loading && !pokemon) {
      fetchPokemon();
    }
  }, [loading, pokemon]);
  return !pokemon ? <p>Loading....</p> : <PokemonCard pokemon={pokemon} />;
}
