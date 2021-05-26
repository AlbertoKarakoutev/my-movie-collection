import { useState, useEffect } from 'react';
import '../style/favorites.css';
import { fetchApiKey } from '../api-key'

const  Favorites = () => {
    
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
      let mounted = true;

      if(mounted){
        fetchApiKey().then(res0 => {
          const key = JSON.parse(res0).apiKey;
      
          fetch("/favorites")
          .then(res1 => res1.json())
          .then(data1 => {

            const populateArray = async () => {
              let fetchedFavorites = [];
              for(let i = 0; i < data1.length; i++){
                const res2 = await fetch("https://api.themoviedb.org/3/movie/"+data1[i]["movieID"]+"?api_key="+key+"&language=en-US");
                const data2 = await res2.json();
                fetchedFavorites.push(data2);
              }
              return fetchedFavorites;
            }
            populateArray().then(result => setFavorites(result));
            
          });

        });
      }
      
      return () => mounted = false;
    }, [])

    const maxRating = 10;

    return (
        <div className="favorites-container">
            <h2 className="favorites-title" style={{display:'flex', justifyContent:'center'}}>Your Favorites</h2>
            <div className="favorites-list">
                {(favorites.length <= 0 || favorites === null) ? (<h4>No favorites to show!</h4>) : favorites.map((favorite) => (
                    <div className="favorite-element" onClick={e => window.location = "movie/"+String(favorite.id)}>
                      
                      <div className="favorite-info">
                          <h3 className="favorite-info-element">{favorite.title}</h3>
                          <h5 className="favorite-info-element">({favorite.release_date.split("-")[0]})</h5>
                          <h5 className="favorite-info-element">{favorite.vote_average}/{maxRating}</h5>
                          
                      </div>
                      <div className="favorite-banner">
                        <img className="favorite-banner" src={"https://image.tmdb.org/t/p/w500/"+favorite.poster_path} alt="Movie backdrop"></img>
                      </div>
                    </div>
                ))}
            </div>
        </div>
    );
  }
  
  export default Favorites;