import React, { useState, useEffect }  from 'react';
import RBCarousel from 'react-bootstrap-carousel';
import { fetchMovies, fetchGenre, fetchMovieByGenre, fetchPersons, fetchTopratedMovie } from "../service/Axios";
import { Link  } from 'react-router-dom';
import Navbar from './Navbar'
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import '../App.css'

//useState for setting up now whats nowPlaying, see all genres, see movies by genre, see trending persons, top rated movies regardless of genre
export function Home() { 
    const [nowPlaying, setNowPlaying] = useState([]);
    const [genres, setGenres] = useState([]);
    const [movieByGenre, setMovieByGenre] = useState([]);
    const [persons, setPersons] = useState([]);
    const [topRated, setTopRated] = useState([]);
//useEffect axios calls for nowPlaying, Genres, MovieByGenre, Person, TopRated


    useEffect(() => {
        const fetchAPI = async () => {
            setNowPlaying(await fetchMovies());
            setGenres(await fetchGenre());
            setMovieByGenre(await fetchMovieByGenre());
            setPersons(await fetchPersons());
            setTopRated(await fetchTopratedMovie()); 
        };
        fetchAPI();
    },[]);
//fucntion handle for onClick to retrieve genre when clicked
    const handleGenre = async (genre_id) => {
        setMovieByGenre(await fetchMovieByGenre(genre_id));
    }
//carousel sliding through the most recent movies
    const movies = nowPlaying.slice(0, 6).map((item, index) => {
        return (
            <div style={{ height: 500, width: '100%' }}key={index}>
                <div className='carousel-center'>
                <Link to={`/movie/${item.id}`}>
                    <img style={{ height: 600 }} src={item.backPoster} alt={item.title}  />
                    </Link>
                </div>
                <div className='carousel-center'>
                </div>
                <div 
                className='carousel-caption'
                style={{ textAlign:'center', fontSize: 50, fontWeight: 'bold', color: 'tomato'}}
                >
                {item.title}</div>
            </div>
        );
    });
//showing all genres under carousel, these genres are clickable which bring you to the other titles that are associated with that genre
    const genreList = genres.map((item, index) => {
        return(
            <li className='genre-inline' key={index}>
                <button type='button' className='genre-btn'  onClick={(e) =>{
                    handleGenre(item.id)
                }}>
                    {item.name}
                </button>
            </li>
        );
    });
//shows the movies under that genre after you click on a specific genre
    const movieList = movieByGenre.map((item, index) => {
        return (
            <div className='mbg' key={index}>
                <div className=''>
                <Link to={`/movie/${item.id}`}>
                    <img className='img-fluid' src={item.poster} alt={item.title}></img>
                </Link>
                <div className='movie-rating'>
                <h5> Rated: {item.rating}  </h5>
                </div>
            </div>    
        </div>
        );
    });

    //shows the top rated movies 
      const topRatedList = topRated.slice(0,4).map(( item, index) => {
          return (
              <div className='tr' key={index}>
                  <div className='card'>
                      <Link to={`/movie/${item.id}`}>
                          <img className='img-fluid' src={item.poster} alt={item.title} />
                    </Link>
                </div>
                <div className='mt-3'>
                <p> Rated: {item.rating}  </p>
                </div>
              </div>
          )
      })


    return (
        <div>
        <Navbar />
        <div className="container">
            <div className='row mt-2'>
                <div className='col'>
                    <RBCarousel
                        autoplay={true}
                        pauseOnVisibitlity={true}
                        slideshowSpeed={5000}
                        version={4}
                        indiators={false}
                        >
                            {movies}
                    </RBCarousel>
                </div>
                <div className='row mt-4'>
                    <div className=''>
                        <ul className='list'>
                            {genreList}
                        </ul>
                    </div>
                </div>
            <div className='movie-list'>{movieList}</div> 
            </div>
            <div className=''>
                <div className=''>
                    <p className='trm'>
                        TOP RATED MOVIES
                    </p>
                </div>
            </div>
            <div className='top-rated-list'>{topRatedList}</div>
        </div>
    </div>
    )
}