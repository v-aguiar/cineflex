import {Link, useNavigate, useLocation} from "react-router-dom"

import "./style.css"

export default function Header() {
  const location = useLocation().pathname

  const navigate = useNavigate()

  return (
    <header className="Header">
      {(location === "/") ? <></> : <button type="button" onClick={() => navigate(-1)} > ↩ Back</button>}
      <Link to="/">
        <h1>CINEFLEX</h1>
      </Link>
    </header>
  )
}