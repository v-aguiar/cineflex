import {useState} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

export default function DataInput({selectedSeats, seats}) {
  const [buyerName, setBuyerName] = useState("")
  const [buyerCPF, setBuyerCPF] = useState("")

  const seatsIds = selectedSeats.map(selected => selected.id)
  const seatsArr = selectedSeats.map(selected => selected.seat)

  function handleSubmit(e) {
    e.preventDefault()
  }

  function postData() {
    const data = {
      ids: seatsIds,
      name: buyerName,
      cpf: buyerCPF
    }

    const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", data)

    promise.then(() => {console.log("success")})
    promise.catch((err) => {console.error("Deu ruim! ", err.response)})
  }

  return (
    <form onSubmit={handleSubmit} className="data-input">
      <label htmlFor="username">Nome do comprador:
        <input name="buyerName" placeholder="Digite seu nome..." type="text" id="username" value={buyerName} onChange={(event) => setBuyerName(event.target.value)} required />
      </label>
      <label htmlFor="userCpf">CPF do comprador:
        <input name="buyerCPF" placeholder="Digite seu CPF..." type="number" id="userCpf" value={buyerCPF} onChange={(event) => setBuyerCPF(event.target.value)} minLength="11" required />
      </label>

      <Link to="/sucesso" type="submit" className="button" onClick={postData} state={{
        name: buyerName,
        cpf: buyerCPF,
        title: seats.movie.title,
        date: `${seats.name} ${seats.day.date}`,
        seats: seatsArr
      }} >Reservar assento(s)</Link>
    </form>
  )
}