import {Link} from "react-router-dom"

import "./style.css"

export default function Header() {
  return (
    <header>
      <Link to="/">
        <h1>CINEFLEX</h1>
      </Link>
    </header>
  )
}