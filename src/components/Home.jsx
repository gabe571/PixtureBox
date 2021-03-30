import React, { useState, useEffect }  from 'react';
import RBCarousel from 'react-bootstrap-carousel';
import ReactStars from 'react-rating-stars-component'
import { fetchMovies, fetchGenre, fetchMovieByGenre } from "../service";
import { Link } from 'react-router-dom';
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';

export function Home() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [genres, setGenres] = useState([]);
    const [movieByGenre, setMovieByGenre] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setNowPlaying(await fetchMovies());
            setGenres(await fetchGenre());
            setMovieByGenre(await fetchMovieByGenre());
        };
        fetchAPI();
    },[]);

    const movies = nowPlaying.slice(0, 5).map((item, index) => {
        return (
            <div style={{ height: 500, width: '100%' }}key={index}>
                <div className='carousel-center'>
                    <img style={{ height: 600 }} src={item.backPoster} alt={item.title} />
                </div>
                <div className='carousel-center'>
                    <i 
                    className='far fa-play-circle' 
                    style={{ fontSize: 100, color: 'orange'}}
                    ></i>
                </div>
                <div 
                className='carousel-caption'
                style={{ textAlign:'center', fontSize: 50, fontWeight: 'bold', color: 'tomato'}}
                >
                {item.title}</div>
            </div>
        );
    });

    const genreList = genres.map((item, index) => {
        return(
            <li className='list-inline-item' key={index}>
                <button type='button' className='btn' style={{ color: 'tomato' }}>
                    {item.name}
                </button>
            </li>
        );
    });

    const movieList = movieByGenre.slice(0, 4).map((item, index) => {
        return (
            <div className='col-md-3 col-sm-6' key={index}>
                <div className='card>'>
                <Link to={`/movie/${item.id}`}>
                    <img className='img-fluid' src={item.poster} alt={item.title}></img>
                </Link>
                <div className='mt-3'>
                <p> Rated: {item.rating} </p>
                <ReactStars 
                count={item.rating} 
                size={20} 
                color={`#f4c10f`}>
                </ReactStars>
                </div>
            </div>    
        </div>
        )
    })
    return (
        <div>
            <h1 className='logo'> PixtureBox </h1>
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
                    <div className='col'>
                        <ul className='list'>
                            {genreList}
                        </ul>
                    </div>
                </div>
                <div className='row mt-3'>{movieList}</div>
            </div>
        </div>
        </div>
    )
}