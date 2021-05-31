import React, { useState } from "react";
import { Link  } from 'react-router-dom';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';


export default function SearchMovies(){


    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const searchMovies = async (e) => {
        e.preventDefault();
        setQuery('');
        console.log("submitting");
        
 
        
        const queryUrl = `https://api.themoviedb.org/3/search/movie?api_key=63cad23fc5d27c914717d084f3379dd9&language=en-US&query=${query}&page=1&include_adult=false`;
        
        try {
            const res = await fetch(queryUrl);
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
        <button className="s-button" type="submit"><i class="fa fa-search fa-2x" aria-hidden="true"></i></button>
            <label className="label" htmlFor="query"></label>
            <input className="input" type="text" name="query"
                placeholder="Search Movie Here..."
                value={query} onChange={(e) => setQuery(e.target.value)}
                />
            {/* <button className="s-button" type="submit"><i class="fa fa-search fa-2x" aria-hidden="true"></i></button> */}
        </form>
        <div className="movie-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <div className="img-fluid" key={movie.id}>
                        <Link to={`/movie/${movie.id}`}>
                        <img className="card" style={{ height: '400px', width: '250px'}}
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

