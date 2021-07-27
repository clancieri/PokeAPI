import React, { useEffect, useState} from 'react';
import { Typography, Link, CircularProgress, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { toFirstCharUppercase } from './constants';
import axios from 'axios';
import Counter from './counter';

const styles = makeStyles (theme=> ({
  CardPokemon:{
    display: "flex",
    margin: "auto",
  
  }
}));
const Pokemon = (props) => {
  const { history, match }  = props;
  const classes = styles ();
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);
  
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = () => {
    const { name, id, weight, types } = pokemon;
    const fullImageUrl= `https://img.pokemondb.net/artwork/large/${name}.jpg`;
    return (
      <>
      <div className={classes.CardPokemon}>
      <div><img style={{ width: "200px", height: "200px" }} src={fullImageUrl} /></div>
      <div><Typography variant="h2"> 
         {`${id}.`} {toFirstCharUppercase(name)}
       </Typography>
       <Typography>Weight: {weight} </Typography>
        <Typography variant="h6"> Types:</Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return <Typography key={name}> {`${name}`}</Typography>;
        })}</div>
      </div>
       
      </>
    )
  }
  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Counter />}

      {pokemon !== undefined && (
        <Button variant="contained" onClick={() => history.push("/")}>
          ir atras        </Button>
      )}
    </>
  );
};

export default Pokemon;