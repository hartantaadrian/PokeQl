import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

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
        image
        types
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
          if (loading) return loading;
          if (error) console.log(error);
          console.log(data.pokemon.evolutions);
          return (
            <React.Fragment>
              <div className="row">
                <div className="col">
                  <img src={data.pokemon.image}></img>
                  <div className="d-flex">
                    {data.pokemon.evolutions
                      ? data.pokemon.evolutions.map((dt) => {
                          return <img src={dt.image}></img>;
                        })
                      : null}
                  </div>
                </div>
                <div className="col">
                  <div>{data.pokemon.types}</div>
                  <div>
                    wieght: {data.pokemon.weight.minimum} -{" "}
                    {data.pokemon.weight.maximum}
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
