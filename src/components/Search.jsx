import React, { useState } from "react";
import { Link  } from 'react-router-dom';

export default function SearchMovies(){

    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const searchMovies = async (e) => {
        e.preventDefault();
        console.log("submitting");
        
 
        
        const url = `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${query}&page=1&include_adult=false`;
        
        try {
            const res = await fetch(url);
            const data  = await res.json();
            console.log(data.results);
            setMovies(data.results)
        } catch (err) {
            console.error(err)
        }
    }
    

    return (
    <>
    <br></br>
        <form className="form" onSubmit={searchMovies}>
            <label className="label" htmlFor="query"></label>
            <input className="input" type="text" name="query"
                placeholder="i.e. Jurassic Park"
                value={query} onChange={(e) => setQuery(e.target.value)}
                />
            <button className="button" type="submit">Search</button>
        </form>
        <div className="movie-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <div className="mbg" key={movie.id}>
                        <Link to={`/movie/${movie.id}`}>
                        <img className="card" style={{ height: '100%', width: '80%'}}
                            src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                            alt={movie.title + ' poster'}
                            />
                        </Link>
     <div className=""  style={{ textAlign:'center', fontSize: 50, fontWeight: 'bold' }}>
                        </div>

                    </div>
                ))}
            </div>    
        </>
    )
}

{/* <div className='mbg' key={index}>
<div className=''>
<Link to={`/movie/${item.id}`}>
    <img className='img-fluid' src={item.poster} alt={item.title}></img>
</Link>
<div className='movie-rating'>
<h5> Rated: {item.rating}  </h5>
</div>
</div>    
</div> */}