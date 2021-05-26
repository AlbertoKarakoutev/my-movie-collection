import { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import '../style/popular.css';
import { fetchApiKey } from '../api-key'

const  Popular = () => {

    const [popular, setPopular] = useState([]);
    //const [key, setKey] = useState("");

    useEffect(() => {
      let mounted = true;

      fetchApiKey().then(res => {
        const key = JSON.parse(res).apiKey;
      
        fetch("https://api.themoviedb.org/3/movie/popular?api_key="+key+"&language=en-US&page=1")
        .then(response => response.json())
        .then(data => {
          if(mounted)setPopular(data.results);
        });
      
      });
      
      return () => mounted = false;
    }, [])

    const horizontalScroll = (e) => {

      if(e.deltaY<0){
        scrollLeft();
      }else{
        scrollRight();
      }
      
    }

    const noVerticalScroll = () => {
      window.scrollTo(0, 0);
    }
    
    const disableScroll = () => {
      window.addEventListener('scroll', noVerticalScroll);
    }
    const enableScroll = () => {
      window.removeEventListener('scroll', noVerticalScroll);
    }

    const scrollLeft = () => {
      let container = document.getElementById("popular-container");
      let element = document.getElementsByClassName("popular-element")[0];
      container.scrollBy({
        left:-element.offsetWidth-((5/100)*container.offsetWidth),
        behavior: 'smooth'
      });
    }

    const scrollRight = () => {
      let container = document.getElementById("popular-container");
      let element = document.getElementsByClassName("popular-element")[0];
      container.scrollBy({
        left:element.offsetWidth+((5/100)*container.offsetWidth),
        behavior: 'smooth'
      });
    }

    return (
      <div style={{display:'flex', position:'relative', height:'auto'}}>
                
        <div className="popular-scroll sc-left" onClick={scrollLeft}><FaAngleLeft/></div>
        <div id="popular-container" className="popular-container" onMouseEnter={disableScroll} onMouseLeave={enableScroll} onWheel={(e) => horizontalScroll(e)}>
          
          <div className="offset"></div>
          {popular.map(singlePopular => (
            <div className="popular-element" onMouseOver={disableScroll} key={singlePopular.id} onClick={e => window.location = "movie/"+String(singlePopular.id)}>
              <div onMouseOver={disableScroll} className="popular-info">
                <h2 onMouseOver={disableScroll} style={{marginBottom:0, fontWeight:'bold'}}> {singlePopular.title} </h2>
                <h5 onMouseOver={disableScroll} style={{       marginTop:0, color:"white"}}> ({singlePopular.release_date.split("-")[0]}) </h5>
                <h3 onMouseOver={disableScroll} style={{    marginBottom:0, color:"white"}}> TMDB: {singlePopular.vote_average}/10 </h3>
              </div>
              <div onMouseOver={disableScroll} className="popular-banner">
                <img onMouseOver={disableScroll} src={"https://image.tmdb.org/t/p/w500/"+singlePopular.backdrop_path} alt="Movie backdrop" style={{borderRadius:'5px', boxShadow:'-1px 1px 20px 1px black'}}></img>
              </div>
            </div>
          ))}
          <div className="offset"></div>

        </div>
        
        <div className="popular-scroll sc-right" onClick={scrollRight}><FaAngleRight/></div>

      </div>
    );
  }
  
  export default Popular;