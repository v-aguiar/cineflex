import "./style.css"

export default function Footer({data, isSeatComponent}) {
  const image = isSeatComponent ? data.movie.posterURL : data.posterURL
  const title = isSeatComponent ? data.movie.title : data.title
  const date = isSeatComponent ? `${data.day.weekday} ${data.name}` : ''

  return (
    <article className="Footer">
      <div className="imgWrapper">
        <img src={image} alt="Movie poster" />
      </div>

      {
        isSeatComponent
          ?
          <span className="movie-date">
            <p className="movie-title">{title}</p>
            <p>{date}</p>
          </span>
          :
          <p className="movie-title">{title}</p>
      }

    </article>
  )
}