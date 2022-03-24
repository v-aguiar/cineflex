import {useState, useEffect} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import loading from "../../assets/img/loading.gif"

import "./style.css"

export default function Movies() {
  const [movies, setMovies] = useState([])

  const path = "/sessoes/"

  useEffect(() => {
    const request = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies")

    request.then((response) => {
      setMovies(response.data)
    })
  }, [])

  if(movies.length === 0) {
    return (
      <div className="Movies --loading">
        <img src={loading} alt="loading gif" />
      </div>
    )
  }

  return (
    <section className="Movies">
      <h2 className="description">Selecione o filme</h2>
      <ul className="container">
        {movies.map(movie => {
          return (
            <li key={movie.id} className="imgWrapper">
              <Link to={path + movie.id}>
                <img src={movie.posterURL} alt="Movie poster" />
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}