import {useState, useEffect} from "react"
import {Link, useParams} from "react-router-dom"

import axios from "axios"

import loading from "../../assets/img/loading.gif"

import "./style.css"

export default function Sessions() {
  const [sessions, setSessions] = useState([])
  const {movieId} = useParams()

  const days = sessions.days

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
      <h2 className="description">Selecione o horário</h2>

      <ul className="days">
        {days.map(day => {
          return (
            <li className="day" key={day.id}>
              <p className="date">{day.weekday} - {day.date}</p>
              <ul className="showtimes">
                {day.showtimes.map(showtime => {
                  return (
                    <li className="showtime" key={showtime.id}>
                      <Link to="/">{showtime.name}</Link>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>

      <article className="footer">
        <div className="imgWrapper">
          <img src={sessions.posterURL} alt="Movie poster" />
        </div>
        <p className="movie-title">{sessions.title}</p>
      </article>

    </section>
  )
}