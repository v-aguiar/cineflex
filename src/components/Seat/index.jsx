import {useState} from "react"

export default function Seat({addSeat, seat}) {
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