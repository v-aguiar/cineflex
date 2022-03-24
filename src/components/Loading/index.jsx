import loading from "../../assets/img/loading.gif"

import "./style.css"

export default function Loading() {
  return (
    <div className="Loading">
      <img src={loading} alt="loading gif" />
    </div>
  )
}