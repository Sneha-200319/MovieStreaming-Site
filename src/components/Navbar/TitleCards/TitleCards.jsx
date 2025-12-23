import React, { useEffect, useRef } from 'react'
import './TitleCards.css'
import cards_data from '../../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'




const TitleCards = ({title, category}) => {

  const[apiData, setApiData] = React.useState([]);  

  const cardsRef = useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzU1NmRiNmVkOTVhMDg0YWY5ZDA5OGEzMTQ5Y2Q2YiIsIm5iZiI6MTc2NTEwMjUzNS4zODksInN1YiI6IjY5MzU1M2M3Zjg5OWFjNTE2ZTQ4ZWMwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H8vCa2R_gzMua9RBuZXkA4Lqe_t7a0vDRcYD_ImwxOs'
  }
};



const handleWheel = (e) => {
  e.preventDefault();
  cardsRef.current.scrollLeft += e.deltaY;
}

useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener("wheel", handleWheel);
}, []);


  return (
    <div className="title-cards">
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          
        })}
      </div>
    </div>
  )
}

export default TitleCards
