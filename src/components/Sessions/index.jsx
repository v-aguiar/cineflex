import {useState, useEffect} from "react"
import {Link, useParams} from "react-router-dom"

import axios from "axios"

import Loading from "../Loading"
import Footer from "../Footer"

import "./style.css"

export default function Sessions() {
  const [sessions, setSessions] = useState([])
  const {movieId} = useParams()

  const days = sessions.days

  window.scrollTo({top: 0, behavior: 'smooth'})

  function getSessions(id) {
    const request = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${id}/showtimes`)

    request.then((response) => {
      setSessions(response.data)
    })
  }

  useEffect(() => getSessions(movieId), [movieId])

  if(sessions.length === 0) {
    return (
      <Loading />
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
                      <Link to={`/assentos/${showtime.id}`}>{showtime.name}</Link>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>

      <Footer image={sessions.posterURL} title={sessions.title} />
    </section>
  )
}