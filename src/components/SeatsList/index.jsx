import Seat from "../Seat";

export default function SeatsList({seatsData, addSeat}) {
  return (
    <ul className="seats">
      {seatsData.map(seat => <Seat key={seat.id} addSeat={addSeat} seat={seat} />)}
    </ul>
  )
}