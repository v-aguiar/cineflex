import {useState} from "react"
import {Link} from "react-router-dom"

export default function DataInput({handleSubmit, selectedSeats, seats}) {
  const [buyerName, setBuyerName] = useState("")
  const [buyerCPF, setBuyerCPF] = useState("")

  return (
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
  )
}