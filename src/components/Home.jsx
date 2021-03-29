import React, { useState, useEffect }  from 'react';
import RBCarousel from 'react-bootstrap-carousel';
import { fetchMovies, fetchGenre } from "../service";
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css'

export function Home() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setNowPlaying(await fetchMovies());
            setGenres(await fetchGenre());
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
        )
    })
    return(
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
            </div>
        </div>
        </div>
    )
}