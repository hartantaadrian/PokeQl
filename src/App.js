import React from "react";
import { Route, Switch } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import "./App.css";
import NavBar from "./Component/NavBar";
import PokemonList from "./Container/PokemonList";
import PokemonDetails from "./Container/PokemonDetails";

function App() {
  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app",
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <NavBar>
          <Switch>
            <Route path="/" exact component={PokemonList} />
            <Route path="/details/:id" exact component={PokemonDetails} />
          </Switch>
        </NavBar>
      </div>
    </ApolloProvider>
  );
}

export default App;
