import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import styles from "./PokemonDetails.module.css";
import Spinner from "../Component/Spinner/Spinner";

function PokemonDetails(props) {
  const id = props.match.params.id;
  console.log(id);
  const query = gql`
    query PokemonQuery($id: String!) {
      pokemon(id: $id) {
        id
        name
        classification
        weaknesses
        resistant
        image
        types
        height {
          minimum
          maximum
        }
        weight {
          minimum
          maximum
        }
        attacks {
          fast {
            name
            type
            damage
          }
          special {
            name
            type
            damage
          }
        }
        evolutions {
          id
          name
          image
        }
      }
    }
  `;
  return (
    <React.Fragment>
      <Query query={query} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <Spinner></Spinner>;
          if (error) console.log(error);
          console.log(data.pokemon);
          return (
            <React.Fragment>
              <div className="container my-5">
                <div className="row">
                  <div className="col mt-5">
                    <div className="card">
                      <div className="card-body">
                        <h3 className="card-title">Type</h3>
                        <h5 className="card-text">
                          {data.pokemon.types
                            ? data.pokemon.types.join(",")
                            : null}
                        </h5>
                      </div>
                    </div>
                    <div className="card mt-3">
                      <div className="card-body">
                        <h3 className="card-title">Weakness & Resistance</h3>
                        <div className="card-text">
                          <h5>
                            Weakness :{" "}
                            {data.pokemon.resistant
                              ? data.pokemon.resistant.join(",")
                              : null}
                          </h5>
                          <h5>
                            Resistance:{" "}
                            {data.pokemon.weaknesses
                              ? data.pokemon.weaknesses.join(",")
                              : null}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="text-center my-3">
                      <img
                        className=" rounded"
                        alt="imagePokemon"
                        src={data.pokemon.image}
                      ></img>
                      <h2>{data.pokemon.name}</h2>
                    </div>
                  </div>

                  <div className="col mt-5">
                    <div className=" card ">
                      <div className="card-body">
                        <h3 className="card-title">Dimension</h3>
                        <div className="card-text">
                          <h5>
                            Height : {data.pokemon.height.minimum} -{" "}
                            {data.pokemon.height.maximum}
                          </h5>
                          <h5>
                            Weight: {data.pokemon.weight.minimum} -{" "}
                            {data.pokemon.weight.maximum}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="card mt-3">
                      <div className="card-body">
                        <h3 className="card-title">Classification</h3>
                        <h5 className="card-text">
                          {data.pokemon.classification}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card p-3">
                  <div className="card-body">
                    <h3 className="card-title">Evolution</h3>
                    <div className="d-flex">
                      {data.pokemon.evolutions
                        ? data.pokemon.evolutions.map((dt) => {
                            return (
                              <Link key={dt.id} to={`/details/${dt.id}`}>
                                <img
                                  alt="imageEvolution"
                                  className={
                                    `img-thumbnail  rounded mx-3 ` +
                                    styles.evoImg
                                  }
                                  key={dt.id}
                                  src={dt.image}
                                ></img>
                              </Link>
                            );
                          })
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </Query>
    </React.Fragment>
  );
}

export default PokemonDetails;
