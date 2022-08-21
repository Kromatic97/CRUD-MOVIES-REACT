import React from 'react';
import axios from 'axios';
//componente A1//
const CardMovies = ({movie, getAllMovies, setUpdateInfo, handleOpenForm}) => {//Se recible la pro A2 desestruturar//
  
    //Funcion Borrar ojo importar axios y enviar al elemento onClick del btn Delete//
    const deleteMovie = () => {
        const URL=`https://movies-crud-academlo.herokuapp.com/movies/${movie.id}/`
        axios.delete(URL)
        .then(res => {
            console.log(res.data)
            getAllMovies()
        })
        .catch(err => console.log(err))
     }
     //Termina Funcion borrar//

     //FUNCION UPDATE
     const handleUpdateClick = () => {
        handleOpenForm()
        //IR AL PADRE MAS CERCANO APS.JSX//
        setUpdateInfo(movie)//--se envia al padre la info//
        
     }

    return (
    <article className='card'>
        <h2 className='card__title'>{movie?.name}</h2>
        <hr />
        <ul className='card__list'>
            <li className='card__item'>Genre: <span className='card__span'>{movie.genre}</span></li>
            <li className='card__item'>Duration: <span className='card__span'>{movie.duration}</span></li>
            <li className='card__item'>Realease Date: <span className='card__span'>{movie["release_date"]}</span></li>
        </ul>
        <div className='card__footer'>

            <button onClick={deleteMovie} className='card__btn'>Delete</button>
            <button onClick={handleUpdateClick}className='card__btn'>Update</button>
        </div>
    </article>
  )
}

export default CardMovies