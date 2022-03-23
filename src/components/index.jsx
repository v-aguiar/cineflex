import {BrowserRouter, Routes, Route} from "react-router-dom"

import Header from "./Header"

import "../assets/styles/reset.css"
import "../assets/styles/style.css"

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>

      </Routes>
    </BrowserRouter>
  )
}