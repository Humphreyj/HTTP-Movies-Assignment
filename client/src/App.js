import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import EditMovie from './components/EditMovie';
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const [movies, updateMovies] = useState([]);
  useEffect(() => {
    axios
    .get("http://localhost:5000/api/movies")
      .then(res => updateMovies(res.data))
      .catch(err => console.log(err.response));

  },[])



  const updateItem = (id, movie) => {
      axios.put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        console.log(res.data)
        updateMovies(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }

  const deleteMovie = id => {
    console.log(id);
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then( res => {
      console.log(res)
      updateMovies(res.data);

    })
    .catch(err => {
      console.log(err);
    })

  }

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} deleteMovie={deleteMovie} movies={movies}/>;
        }}
        
      />

      <Route
        path="/update-movie/:id"
        render={props => {
          return <EditMovie {...props} updateItem={updateItem} movies={movies} />;
        }}
        
      />
    </>
  );
};

export default App;
