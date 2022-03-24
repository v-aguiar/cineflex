import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";

import axios from "axios";

import Loading from "../Loading";
import Footer from "../Footer";
import SeatsList from "../SeatsList";
import DataInput from "../DataInput";

import "./style.css"

export default function Seats() {
  const [seats, setSeats] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])

  const {sessionId} = useParams()

  const seatsData = seats.seats

  function getSeats(id) {
    const request = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${id}/seats`)

    request.then((response) => {
      setSeats(response.data)
    })
    request.catch((err) => console.error("Erro: ", err.reponse))
  }

  function addSeat(seat, id) {
    /* 
      if current selected seat has alredy been selected 
        ------- > remove seat and id from selectedSeats array, keeps previous selected seats data
        else -- > add current selected seat and id to SelectedSeats array
    */
    if(!(selectedSeats.filter(selectedSeat => selectedSeat.seat === seat).length > 0 && selectedSeats.length > 0)) {
      // Selecting
      setSelectedSeats([...selectedSeats, {seat: seat, id: id}])
    } else {
      // Removing
      setSelectedSeats([...selectedSeats].filter(selected => selected.seat !== seat))
    }
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

      <DataInput selectedSeats={selectedSeats} seats={seats} />

      <Footer data={seats} isSeatComponent={true} />
    </section>
  )
}