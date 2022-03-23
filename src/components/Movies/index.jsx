import {useState, useEffect} from "react"
import {Link} from "react-router-dom"

import axios from "axios"
import {v4 as uuidv4} from "uuid"

import loading from "../../assets/img/loading.gif"

import "./style.css"

export default function Movies() {
  const [movies, setMovies] = useState([])

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
            <li key={uuidv4()} className="imgWrapper">
              <Link to="/sessoes">
                <img src={movie.posterURL} alt="Movie cover" />
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}