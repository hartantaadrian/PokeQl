import React, { useState, useEffect } from "react";

import styles from "./PokemonList.module.css";
import gql from "graphql-tag";
import InfiniteScroll from "react-infinite-scroll-component";

import { useQuery } from "@apollo/react-hooks";
import PokemonCards from "../Component/PokemonCards";
import Spinner from "../Component/Spinner/Spinner";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [realData, setRealData] = useState([]);
  let cmp;
  const query = gql`
    {
      pokemons(first: 151) {
        id
        name
        types
        image
      }
    }
  `;
  const { loading, error, data } = useQuery(query);

  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        await setRealData(data.pokemons);
      }
      if (realData.length > 0) {
        console.log(realData);
        await setPokemons(realData.slice(0, 10));
      }
      console.log(pokemons);
    };
    fetchData();
  }, [data, realData]);

  let loadingData = (
    <div className="mx-auto">
      <Spinner />
    </div>
  );

  const addMore = () => {
    setPokemons(realData.slice(0, pokemons.length + 10));
  };
  if (loading) cmp = <Spinner />;
  if (error) return `Error! ${error.message}`;
  if (pokemons) {
    cmp = (
      <InfiniteScroll
        dataLength={pokemons.length} //This is important field to render the next data
        next={addMore}
        hasMore={pokemons.length < 151 ? true : false}
        loader={loadingData}
        className={`${styles.listContainer}`}
      >
        <PokemonCards pokemons={pokemons}></PokemonCards>
      </InfiniteScroll>
    );
  }
  return <div className="container">{cmp}</div>;
}

export default PokemonList;
