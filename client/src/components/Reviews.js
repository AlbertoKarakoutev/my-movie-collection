import {FaRegStar, FaStar} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import '../style/reviews.css';

const Reviews = ({movieID}) => {

    let [ratingAndNotes, setRatingAndNotes] = useState({});
    const [stars, setStars] = useState([]);

    const onNotesChange = (event) => {
        updateData(ratingAndNotes.rating, document.getElementById("notes").value);
    }

    const onStarClick = (event) => {
        updateData(String(parseInt(event.target.id)+1)*2, document.getElementById("notes").value);
    }

    useEffect(() => {

        fetch("/data/"+movieID)
        .then(res => res.json())
        .then(data => {

            setRatingAndNotes(JSON.parse(data));

            //Add filled and not filled stars to the DOM tree
            let starsLocal = [];
            for(let i = 0; i < 5; i++){
                if(i < parseInt(JSON.parse(data).rating)/2){
                    starsLocal.push(<FaStar key={i} id={i} onClick={onStarClick} className="stars"/>)
                }else{
                    starsLocal.push(<FaRegStar key={i} id={i} onClick={onStarClick} className="stars"/>)
                }
            }
            
            setStars(starsLocal);
        });

    }, [])

    const updateData = async (newRating, newNotes) => {
        const newData = { rating: newRating, notes: newNotes };

        fetch('/data/'+movieID, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        });


        setRatingAndNotes(newData);

        let starsLocal = [];
        for(let i = 0; i < 5; i++){
            if(i < parseInt(newRating)/2){
                starsLocal.push(<FaStar key={i} id={i} onClick={onStarClick} className="stars"/>)
            }else{
                starsLocal.push(<FaRegStar key={i} id={i} onClick={onStarClick} className="stars"/>)
            }
        }
        setStars(starsLocal);
        
    }

    return (
      <div className="reviews">
          <h2>Your Review</h2>
          <div>{stars}</div>
          <textarea className="form-control notes" id="notes" value={ratingAndNotes.notes} onChange={onNotesChange}/>
      </div>
    );
  }
  
  export default Reviews;