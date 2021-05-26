import { useEffect, useState } from 'react';
import {FaRegStar, FaStar, FaExternalLinkAlt, FaComment} from 'react-icons/fa'
import noPoster from '../images/no_poster_available.png'
import '../style/movie-info.css';
import { fetchApiKey } from '../api-key'

const  MovieInfo = ({movieID, search}) =>{

    const [movie, setMovie] = useState({});
    const [inFavorites, setInFavorites] = useState(false);
  
    useEffect(() => {
      let mounted = true;

      if(mounted){
        fetchApiKey().then(res => {
          const key = JSON.parse(res).apiKey;

          fetch("https://api.themoviedb.org/3/movie/"+movieID+"?api_key="+key+"&language=en-US")
          .then(response => response.json())
          .then(data => setMovie(data));

          fetch("/favorite/"+movieID)
          .then(response => response.json())
          .then(data => setInFavorites(JSON.parse(data).inFavorites));

        });
      }

      return () => mounted = false;

    }, [movieID])

    const updateFavoriteStatus = async (newFavorite) => {
      const newData = { inFavorites: newFavorite};
      fetch('/favorite/'+movieID, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
      });
  }

    const toggleFavorites = () => {
      setInFavorites(!inFavorites);
      updateFavoriteStatus(!inFavorites);
    }

    const validatedImagePath = () => {
      if(movie.poster_path!=null){
        return "https://image.tmdb.org/t/p/w500/"+movie.poster_path;
      }
      return noPoster
    }

    return (
        <div className="movie-info">
            <div onClick={toggleFavorites} className="movie-image">
                <div className="favorite-button" style={inFavorites ? {color:'#7dbbb2'} : {}}> {inFavorites ? (<FaStar/>) : (<FaRegStar/>)}</div>
                <img src={validatedImagePath()} style={{borderRadius:5}} width="200px" height="280px" alt="Movie poster"></img>
            </div>
            <div className="movie-text" style={{marginLeft:20, position:'relative', width:'100%'}}>
                <h1 style={{marginBottom:0}}>{movie.original_title}</h1>
                <h6 style={{marginTop:0}}>{(movie.genres !== undefined) ? movie.genres.map(genre => genre.name + " " ) : ''} | {movie.runtime} min.</h6>
                <p>{movie.overview}</p>
                {search ? (<a href={"/movie/"+movieID} className="btn" style={{position:'absolute', bottom:'0', right:200}}>Notes And Reviews <FaComment/></a>) : ""}
                <a href={movie.homepage} className="btn" style={{position:'absolute', bottom:'0', right:0}}>Visit Homepage <FaExternalLinkAlt/></a>
            </div>
        </div>
    )
  }
  
  export default MovieInfo;