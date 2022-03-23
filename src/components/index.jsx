import {BrowserRouter, Routes, Route} from "react-router-dom"

import Header from "./Header"

import "../assets/styles/reset.css"
import "../assets/styles/style.css"
import Movies from "./Movies"

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Movies />} />
      </Routes>
    </BrowserRouter>
  )
}