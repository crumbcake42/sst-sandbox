import { FC } from "react";
import { Inter } from "next/font/google";
import { IPokemon } from "pokeapi-typescript";

import styles from "./PokemonCard.module.css";

const inter = Inter({ subsets: ["latin"] });

export const PokemonCard: FC<{ pokemon: IPokemon }> = ({ pokemon }) => {
  return (
    <div className={`${inter.className} ${styles.card} bg-yellow-50`}>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pokemon.sprites.front_default}
          width="400"
          alt={`${pokemon.name} sprite`}
        />
      </div>
      <p>name: {pokemon.name}</p>
    </div>
  );
};
