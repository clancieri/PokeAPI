import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Grid, Card, CardMedia, CardContent, CircularProgress, Typography, TextField, Button } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { toFirstCharUppercase } from './constants';
import axios from 'axios';

const useStyles = makeStyles (theme => ({
  pokedexContainer: {
    paddingTop: '20px',
    paddingLeft: '50px',
    paddingRight: '50px'
  },
  CardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
  searchContainer: {
    marginLeft: '25px',
    display: 'flex',
    backgroundColor: alpha(theme.palette.common.white, 0.15),

  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "200px",
    margin: "5px",
  }
}));


const Pokedex = (props) => {
  const { history } = props;
  const classes = useStyles ();
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState ("");

  const handleSearchChange = (e) => {
    setFilter (e.target.value);
  };

  useEffect(() => {
    axios
    .get (`https://pokeapi.co/api/v2/pokemon?limit=150`)
    .then(function (response){
      const { data } = response;
      const { results } = data;
      const newPokemonData = {};
      results.forEach((pokemon, index) => {
        newPokemonData[index + 1] = {
          id: index + 1,
          name: pokemon.name,
          sprite: `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`,
        
        };
      });
      
      setPokemonData(newPokemonData);
    })

  }, []);

  
const getPokemonCard = (pokemonId) => {
  const { id, name, sprite } = pokemonData[pokemonId];


  return (
    <Grid item xs={12} sm={4} key={pokemonId}>
    <Card onClick ={() => history.push(`/${id}`)}> 
      <CardMedia 
      className={classes.CardMedia}
      image={sprite}
      style={{ width: "90px", height: "90px"}}
      />
      <CardContent className={classes.cardContent}>
            <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
      </CardContent>
    </Card>
  </Grid>
  );
}

  return (
    <>
    <AppBar position="static">
   
      <Toolbar>
        <div className={classes.searchContainer}>
          <SearchIcon className={classes.SearchIcon} />
          <TextField
           onChange={handleSearchChange}
           className={classes.searchInput}
           label="Pokemon"
           variant="standard"

          />
        </div>
        <div className={classes.searchContainer}>
        <Button onClick={() => history.push("/stadistics")}>
          Estadisticas       </Button>
        </div>
      </Toolbar>
    </AppBar>
    {pokemonData ? (
      <Grid container spacing={2} className={classes.pokedexContainer}>
      {Object.keys(pokemonData).map((pokemonId) => 
        pokemonData[pokemonId].name.includes(filter) &&
        getPokemonCard(pokemonId))}
    </Grid>
    ) : (
      <CircularProgress />
    )}
    
    
    </>
  );
};

export default Pokedex;
