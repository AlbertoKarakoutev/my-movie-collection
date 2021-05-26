import Header from './Header'
import MovieInfo from './MovieInfo'
import Reviews from './Reviews'
import Footer from './Footer'

import { useParams } from 'react-router';

const  Movie = () => {
    let { id } = useParams();
    return (
      <div className="App">
          <Header/>
          <MovieInfo movieID={id}/>
          <Reviews movieID={id}/>
          <Footer/>
      </div>
    );
  }
  export default Movie;