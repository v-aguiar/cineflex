import "./style.css"

export default function Footer({image, title}) {
  return (
    <article className="Footer">
      <div className="imgWrapper">
        <img src={image} alt="Movie poster" />
      </div>
      <p className="movie-title">{title}</p>
    </article>
  )
}