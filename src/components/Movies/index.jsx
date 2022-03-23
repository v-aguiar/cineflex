import {Link} from "react-router-dom"

import movie1 from "../../assets/img/movie1.png"
import movie2 from "../../assets/img/movie2.png"

import "./style.css"

export default function Movies() {
  return (
    <section className="Movies">
      <h2 className="description">Selecione o filme</h2>
      <div className="container">
        <Link to="/sessoes/:movieId" >
          <div className="imgWrapper">
            <img src={movie1} alt="Movie cover picture" />
          </div>
        </Link>
        <Link to="/sessoes/:movieId" >
          <div className="imgWrapper">
            <img src={movie2} alt="Movie cover picture" />
          </div>
        </Link>
        <Link to="/sessoes/:movieId" >
          <div className="imgWrapper">
            <img src={movie1} alt="Movie cover picture" />
          </div>
        </Link>
        <Link to="/sessoes/:movieId" >
          <div className="imgWrapper">
            <img src={movie2} alt="Movie cover picture" />
          </div>
        </Link>
        <Link to="/sessoes/:movieId" >
          <div className="imgWrapper">
            <img src={movie1} alt="Movie cover picture" />
          </div>
        </Link>
        <Link to="/sessoes/:movieId" >
          <div className="imgWrapper">
            <img src={movie2} alt="Movie cover picture" />
          </div>
        </Link>
        <Link to="/sessoes/:movieId" >
          <div className="imgWrapper">
            <img src={movie1} alt="Movie cover picture" />
          </div>
        </Link>
        <Link to="/sessoes/:movieId" >
          <div className="imgWrapper">
            <img src={movie2} alt="Movie cover picture" />
          </div>
        </Link>
      </div>
    </section>
  )
}