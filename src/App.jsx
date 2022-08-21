import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import CardMovies from './components/CardMovies'
import Form from './components/Form'

function App() {
//Peticion de la API USESTATE-USEEFFECT-AXIOS//
  const [movies, setMovies] = useState()

//Para el UPDATE de la CARDMOVIES//
  const [updateInfo, setUpdateInfo] = useState()

//Para el modal//
const [isFormOpen, setIsFormOpen] = useState(false)

//renderizado de la informacion//
  const getAllMovies = () =>{
    const URL = 'https://movies-crud-academlo.herokuapp.com/movies/'
    axios.get(URL)
    .then(res => setMovies(res.data))
    .catch(err => console.log(err))
  }
//Permite que solo se muestre una vez, o si no crearia un Loop
 useEffect(() => {
  getAllMovies()
 }, [])

 //funcion que abre el formulario que esta cerrado al inicio//
 const handleOpenForm = () => setIsFormOpen(true)

 const handleCloseForm = () => setIsFormOpen(false)

//TERMINA LA PETICION//
  return (
    <div className="App">
      <h1>Movies CRUD</h1>
      <button onClick={handleOpenForm}>Open Form</button>

        <div className={isFormOpen ? 'form-container': 'form-none'}>
          <Form 
          getAllMovies={getAllMovies}
          updateInfo={updateInfo}//se envia al formulario FORM
          setUpdateInfo={setUpdateInfo}//se envia al formulario para resetear el UPDATE a CREATE
          handleCloseForm={handleCloseForm}//para cerrar el form//
          />
        </div>

      <div className='card-container'>
        {
          //se pone llaves porque es contenido dinamico o javascript/
          movies?.map(movie => (
            //se despliega aqui el componente A1//
            <CardMovies 
              key={movie.id}
              movie={movie}//Se envia la pro A2 a CardMovies//
              getAllMovies={getAllMovies}
              setUpdateInfo={setUpdateInfo}//Para el UPDATE CARDMOVIE
              handleOpenForm={handleOpenForm}//para abrir el modal al hacer click en la CardMovies//
              />
          ))
        }
      </div>
    </div>
  )
}

export default App
