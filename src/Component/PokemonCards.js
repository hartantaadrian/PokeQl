import React from "react";
import { Link } from "react-router-dom";
import styles from "./PokemonCard.module.css";

import InfiniteScroll from "react-infinite-scroll-component";

function PokemonCards(props) {
  const { pokemons } = props;

  let cmp;
  cmp = (
    <React.Fragment>
      <Link key={pokemons.id} to={`/details/${pokemons.id}`}>
        <div className={styles.card}>
          <img src={pokemons.image} className={styles.pokeimg}></img>
          <p className={styles.name}>{pokemons.name}</p>
        </div>
      </Link>
    </React.Fragment>
  );

  return <React.Fragment>{cmp}</React.Fragment>;
}

export default PokemonCards;
