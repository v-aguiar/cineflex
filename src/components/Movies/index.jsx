import {useState, useEffect} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import Loading from "../Loading"

import "./style.css"

export default function Movies() {
  const [movies, setMovies] = useState([])

  window.scrollTo({top: 0, behavior: 'smooth'})

  function getMovies() {
    const request = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies")

    request.then((response) => {
      setMovies(response.data)
    })
  }

  useEffect(() => getMovies(), [])

  if(movies.length === 0) {
    return (
      <Loading />
    )
  }

  return (
    <section className="Movies">
      <h2 className="description">Selecione o filme</h2>
      <ul className="container">
        {movies.map(movie => {
          return (
            <li key={movie.id} className="imgWrapper">
              <Link to={`/sessoes/${movie.id}`}>
                <img src={movie.posterURL} alt="Movie poster" />
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}