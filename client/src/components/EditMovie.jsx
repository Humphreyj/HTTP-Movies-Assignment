import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditMovie = (props) => {

    const [movie, editMovie] = useState({
        id: 0,
        title: '',
        director: '',
        metascore: 0,
        stars: [],
    })
    

   

    useEffect(()=> {
    

      const editingItem = props.movies.find(film => {
        console.log(film.id);
        return  film.id === Number(props.match.params.id);
        
        
      })
      if(editingItem) {
        
      editMovie(editingItem)
      }
 
    },[props.movies,props.match.params.id])
    

   const changeHandler = (e) => {
        editMovie({...movie,[e.target.name]: e.target.value})
        console.log(movie);
    }

    const submitHandler = e => {
        e.preventDefault();
        const id = Number(props.match.params.id)
        props.updateItem(id, movie);
        props.history.push('/');
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <h3>Edit {movie.title}</h3>

                <input 
                placeholder='Title'
                name='title'
                value={movie.title}
                onChange={changeHandler}
                type="text"/>
                <input 
                placeholder='Director'
                name='director'
                value={movie.director}
                onChange={changeHandler}
                type="text"/>
                <input 
                placeholder='Metascore'
                name='metascore'
                value={movie.metascore}
                onChange={changeHandler}
                type="number"/>
                <input 
                placeholder='Stars'
                name='stars'
                value={movie.stars}
                onChange={changeHandler}
                type="text"/>

                <button type='submit'>Submit</button>

            </form>
            
        </div>
    );
}

export default EditMovie;
