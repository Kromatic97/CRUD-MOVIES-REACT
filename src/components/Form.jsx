import React, { useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

const defaultValue = {
name:'',
genre:'',
duration:'',
release_date:''
}
const Form = ({getAllMovies, updateInfo, setUpdateInfo, handleCloseForm}) => {
//llenar el formulario solo cuando se de click en UPDATE//
useEffect(() => {
 if(updateInfo){
    reset(updateInfo)
 }
}, [updateInfo])


const createMovie = data => {
    const URL='https://movies-crud-academlo.herokuapp.com/movies/'
    axios.post(URL, data)
    .then(res => {
        console.log(res.data);
        getAllMovies()
    })
    .catch(err => console.log(err))
}
//Funcion para enviar lo que el usuario modifico//
const updateMovie = data =>{
    const URL = `https://movies-crud-academlo.herokuapp.com/movies/${updateInfo.id}/`
    axios.patch(URL, data)
    .then(res => {
        console.log(res.data);
        getAllMovies()
    })
    .catch(err => console.log(err))
}

const {register, reset, handleSubmit}= useForm()

//boton de CREAR Y MODIFICAR SEGuN ESTADO//
const submit = data =>{
    if(updateInfo){
        updateMovie(data)// llama la funcion que modifica con DATA actualizado//
        setUpdateInfo()// recibido por PROs para cambio de update a create
    }else{
        createMovie(data)
    }
    //vaciar el formulario//
    reset(defaultValue)
    handleCloseForm()
}

  return (

<form onSubmit={handleSubmit(submit)} className='form'>
    <div onClick={handleCloseForm} className='form__equis'>x</div>

    <h2 className='form__title'>{updateInfo ? 'Update Movie Information': 'Create New Movie'}</h2>

        <ul className='form__list'>
            <li className='form__item'>
                <label htmlFor='name'>Name</label>
                <input {...register('name')} type="text" id='name'/>
            </li>
            <li className='form__item'>
                <label htmlFor='genre'>Genre</label>
                <input {...register('genre')}type="text" id='genre'/>
            </li>

            <li className='form__item'>
                <label htmlFor='duration'>Duration</label>
                <input {...register('duration')}type="text" id='duration'/>
            </li>

            <li className='form__item'>
                <label htmlFor='release-date'>Release Date</label>
                <input {...register('release_date')}type="date" id='release-date'/>
            </li>
        </ul>
        <button className='form__btn'>{updateInfo ? 'Update': 'Create'}</button>

    </form>
  )
}

export default Form