﻿import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";

import axios from "axios";

import Loading from "../Loading";
import Footer from "../Footer";

import "./style.css"

export default function Seats() {
  const [seats, setSeats] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])
  const [buyerName, setBuyerName] = useState("")
  const [buyerCPF, setBuyerCPF] = useState("")

  const {sessionId} = useParams()

  const seatsData = seats.seats

  function getSeats(id) {
    const request = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${id}/seats`)

    request.then((response) => {
      setSeats(response.data)
      console.log("seats: ", response.data)
    })
    request.catch((err) => console.error("Erro: ", err.reponse))
  }

  function handleSubmit(event) {
    event.preventDefault()
  }

  function addSeat(selectedSeat) {
    console.log(selectedSeat)

    !(selectedSeats.includes(selectedSeat) && selectedSeats.length > 0) ? setSelectedSeats([...selectedSeats, selectedSeat]) : setSelectedSeats([...selectedSeats])

    console.log("selected seats: ", selectedSeats)
  }

  useEffect(() => {window.scrollTo({top: 0, behavior: 'smooth'})}, [])
  useEffect(() => getSeats(sessionId), [sessionId])

  if(seats.length === 0) {
    return (
      <Loading />
    )
  }

  return (
    <section className="Seats">
      <h2 className="description">Selecione o assento</h2>

      <SeatsList seatsData={seatsData} addSeat={addSeat} />

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

      <form onSubmit={handleSubmit} className="data-input">
        <label htmlFor="username">Nome do comprador:
          <input name="buyerName" placeholder="Digite seu nome..." type="text" id="username" value={buyerName} onChange={(event) => setBuyerName(event.target.value)} required />
        </label>
        <label htmlFor="userCpf">CPF do comprador:
          <input name="buyerCPF" placeholder="Digite seu CPF..." type="number" id="userCpf" value={buyerCPF} onChange={(event) => setBuyerCPF(event.target.value)} minLength="11" required />
        </label>

        <Link to="/sucesso" type="submit" className="button" state={{
          name: buyerName,
          cpf: buyerCPF,
          title: seats.movie.title,
          date: `${seats.name} ${seats.day.date}`,
          seats: selectedSeats
        }} >Reservar assento(s)</Link>
      </form>

      <Footer image={seats.movie.posterURL} title={seats.movie.title} />
    </section>
  )
}

function SeatsList({seatsData, addSeat}) {
  return (
    <ul className="seats">
      {seatsData.map(seat => <Seat key={seat.id} addSeat={addSeat} seat={seat} />)}
    </ul>
  )
}

function Seat({addSeat, seat}) {
  const [isSelected, setIsSelected] = useState(false)

  function toogleSelected() {
    setIsSelected(!isSelected)
  }

  if(!seat.isAvailable) {
    return (
      <li className="seat --unavailable" onClick={() => alert("NOPE!")}>
        <p className="seat-number" >{seat.name}</p>
      </li>
    )
  }

  return (
    <li onClick={() => {
      addSeat(seat.name)
      toogleSelected()
    }} className={isSelected ? "seat --selected" : "seat"}>
      <p className="seat-number" >{seat.name}</p>
    </li>
  )
}


