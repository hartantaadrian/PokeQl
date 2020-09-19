import React, { useState } from "react";
import { Query } from "react-apollo";
import styles from "./PokemonList.module.css";
import gql from "graphql-tag";

import client from "../appolo";
import dt from "../dummyData.json";
import PokemonCards from "../Component/PokemonCards";

function PokemonList() {
  const [pokemons, setPokemons] = useState(dt);

  const query = gql`
    {
      pokemons(first: 21) {
        id
        name
        types
        image
      }
    }
  `;

  return (
    <div>
      <div className={`${styles.listContainer}`}>
        <Query query={query}>
          {({ loading, error, data }) => {
            if (loading) return <p>loading....</p>;
            if (error) console.log(error);
            console.log(data);
            return (
              <React.Fragment>
                {data.pokemons.map((pokemon) => {
                  return <PokemonCards pokemons={pokemon}></PokemonCards>;
                })}
              </React.Fragment>
            );
          }}
        </Query>
      </div>
    </div>
  );
}

export default PokemonList;
