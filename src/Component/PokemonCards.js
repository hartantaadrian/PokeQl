import React from "react";
import { Link } from "react-router-dom";
import styles from "./PokemonCard.module.css";

function PokemonCards(props) {
  const { pokemons } = props;
  console.log(pokemons);
  let cmp;
  cmp = (
    <React.Fragment>
      {pokemons.map((pokemon) => {
        return (
          <Link key={pokemon.id} to={`/details/${pokemon.id}`}>
            <div className={styles.card}>
              <img
                src={pokemon.image}
                alt="listPokemon"
                className={styles.pokeimg}
              ></img>
              <p className={styles.name}>{pokemon.name}</p>
            </div>
          </Link>
        );
      })}
    </React.Fragment>
  );

  return <React.Fragment>{cmp}</React.Fragment>;
}

export default PokemonCards;
