import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";

import axios from "axios";

import loading from "../../assets/img/loading.gif"

import "./style.css"

export default function Seats() {
  const [seats, setSeats] = useState([])

  const seatsData = seats.seats
  const {sessionId} = useParams()

  useEffect(() => {
    const request = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`)

    request.then((response) => {
      setSeats(response.data)
      console.log("seats: ", response.data)
    })
    request.catch((err) => console.error("Erro: ", err.reponse))
  }, [sessionId])

  if(seats.length === 0) {
    return (
      <div className="Seats --loading">
        <img src={loading} alt="loading gif" />
      </div>
    )
  }

  return (
    <section className="Seats">
      <h2 className="description">Selecione o assento</h2>

      <ul className="seats">
        {seatsData.map((seat) => {
          return (
            <li key={seat.id} className={`seat ${seat.isAvailable ? "" : "--unavailable"}`}>
              <p className="seat-number">{seat.name}</p>
            </li>
          )
        })}
      </ul>

      <ul className="seats-caption">
        <li className="caption-option">
          <span className="seat --selected"></span>
          <p className="caption-description">Selecionado</p>
        </li>
        <li className="caption-option">
          <span className="seat"></span>
          <p className="caption-description">Disponível</p>
        </li>
        <li className="caption-option">
          <span className="seat --unavailable"></span>
          <p className="caption-description">Indisponível</p>
        </li>
      </ul>

      <form action="/" className="data-input">
        <label htmlFor="username">Nome do comprador: </label>
        <input placeholder="Digite seu nome..." type="text" id="username" required />
        <label htmlFor="userCpf">CPF do comprador: </label>
        <input placeholder="Digite seu CPF..." type="number" id="userCpf" minLength="11" required />

        <button type="submit">Reservar assento(s)</button>
      </form>

      <article className="footer">
        <div className="imgWrapper">
          <img src={seats.movie.posterURL} alt="Movie poster" />
        </div>
        <p className="movie-title">{seats.movie.title}</p>
      </article>
    </section>
  )
}