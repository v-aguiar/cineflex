import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Header from "./Header"
import Movies from "./Movies"
import Sessions from "./Sessions"


import "../assets/styles/reset.css"
import "../assets/styles/style.css"

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/sessoes/:movieId" element={<Sessions />} />
      </Routes>
    </Router>
  )
}