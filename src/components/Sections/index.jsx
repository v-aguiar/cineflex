// import axios from "axios"

import movie1 from "../../assets/img/movie1.png"
import movie2 from "../../assets/img/movie2.png"

export default function Sections() {
  // const [sections, setSections] = useState([])

  // const request = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/ID_DO_FILME/showtimes`)

  // request.then((response) => {
  //   setSections(response.data)
  //   console.log(sections)
  // })

  return (
    <div className="Sections">
      <img src={movie1} alt="movie 1" />
      <img src={movie2} alt="movie 2" />
      <img src={movie1} alt="movie 1" />
      <img src={movie2} alt="movie 2" />
      <img src={movie1} alt="movie 1" />
      <img src={movie2} alt="movie 2" />
      <img src={movie1} alt="movie 1" />
      <img src={movie2} alt="movie 2" />
      <img src={movie1} alt="movie 1" />
      <img src={movie2} alt="movie 2" />
      <img src={movie1} alt="movie 1" />
      <img src={movie2} alt="movie 2" />
      <img src={movie1} alt="movie 1" />
      <img src={movie2} alt="movie 2" />
    </div>
  )
}