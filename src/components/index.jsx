import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Header from "./Header"
import Movies from "./Movies"
import Sessions from "./Sessions"
import Seats from "./Seats"


import "../assets/styles/reset.css"
import "../assets/styles/style.css"

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/sessoes/:movieId" element={<Sessions />} />
        <Route path="/assentos/:sessionId" element={<Seats />}></Route>
      </Routes>
    </Router>
  )
}