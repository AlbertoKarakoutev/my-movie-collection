import Header from './Header'
import MovieInfo from './MovieInfo'
import Paginator from './Paginator'
import Footer from './Footer'

import { fetchApiKey } from '../api-key'

import { useEffect, useState } from 'react';

const  SearchResults = (props) => {
    const term = new URLSearchParams(props.location.search).get("term");
    const page = new URLSearchParams(props.location.search).get("page");
    
    const [results, setResults] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        let mounted = true;

        if(mounted){
            fetchApiKey().then(res0 => {
                const key = JSON.parse(res0).apiKey;

                fetch("https://api.themoviedb.org/3/search/movie?api_key="+key+"&language=en-US&page="+page+"&query="+term)
                .then(res => res.json())
                .then(data => {
                    setResults(data.results);
                    setTotalPages(data.total_pages);
                })
            });
        }
    }, [page, term]);

    const buildMovieList = () => {
        let movieList = [];
        for(let i = 0; i < results.length; i++){
            movieList.push(<MovieInfo key={String(i)} search={true} movieID={results[i].id}/>);
        }
        return movieList;
    }

    return (
      <div className="search-results">
            <Header/>
            <Paginator page={page} term={term} totalPages={totalPages}/>
            {buildMovieList()}
            <Paginator page={page} term={term} totalPages={totalPages}/>
            <Footer/>
      </div>
    );
  }
  export default SearchResults;