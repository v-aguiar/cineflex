import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"

import axios from "axios"

import loading from "../../assets/img/loading.gif"

import "./style.css"

export default function Sessions() {
  const [sessions, setSessions] = useState([])
  const {movieId} = useParams()

  useEffect(() => {
    const request = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieId}/showtimes`)

    request.then((response) => {
      setSessions(response.data)
      console.log(response.data)
    })

  }, [movieId])

  if(sessions.length === 0) {
    return (
      <div className="Sessions --loading">
        <img src={loading} alt="loading gif" />
      </div>
    )
  }

  return (
    <section className="Sessions">
      <h1 className="title">{sessions.title}</h1>
      <div className="imgWrapper">
        <img src={sessions.posterURL} alt="Movie poster" />
      </div>
      <p className="overview">{sessions.overview}</p>
    </section>
  )
}