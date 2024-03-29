import React, { useState, useEffect } from 'react';
import ReactPlayer from "react-player";
import { fetchMovieDetail, fetchMovieByGenre, fetchMovieVideos, fetchCasts, fetchSimilarMovie, fetchSearchPerson } from '../service/Axios'
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { Modal } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'
import Search from './Search';


//accessing movie thats being clicked on Home Page
export function MovieDetail({ match }) {

    let params = match.params;
    let genres = []; 
    const [isOpen, setIsOpen] = useState(false);
    const [detail, setDetail] = useState([]);
    const [video, setVideo] = useState([]);
    const [casts, setCasts] = useState([]);
    const [similarMovie, setSimliarMovie] = useState([]);
    const [persons, setPersons] = useState([]);

//useEffect calls for detail, video, casts and similar movie
    useEffect(() => {
        const fetchAPI = async () => {
            setDetail(await fetchMovieDetail(params.id));
            setVideo(await fetchMovieVideos(params.id));
            setCasts(await fetchCasts(params.id));
            setSimliarMovie(await fetchSimilarMovie(params.id))
            setPersons(await fetchSearchPerson(params.id))
        };
            fetchAPI();
        }, [params.id]);
        genres = detail.genres;

      
        
    const MoviePlayerModal = (props) => {
        const youtubeUrl = 'https://www.youtube.com/watch?v=';
        return (
            <Modal 
            {...props}
            size='lg'
            centered
            >    
                <ReactPlayer 
                className='react-player'
                url={youtubeUrl + video.key} 
                playing
                width='125%'
                height='100%'
                >
                </ReactPlayer>
            </Modal>
        );
    };
//returns genres associated with this movie
    let genresList;
  if (genres) {
    genresList = genres.map((g, i) => {
      return (
        <li className='li-list' key={i}>
          <li className='li-list'> 
            {g.name} |
          </li>
        </li>
      );
    });
  }
//returns casts for current movie being shown 
  const castList = casts.slice(0, 12).map((c, i) => {
    return (
      <div key={i}>
        <img
          className='cast-image'
          src={c.img}
          alt={c.name}
        ></img>
        <p className='cast-name'>{c.name}</p>
        <p className='cast-character'>
          {c.character}
        </p>
      </div>
    );
  });

  const castPerson = casts.map((p, i) => {
    return (
      <div key={i}>
        <h1>{p.birthday}</h1>
      </div>
    );
  });

//returns similar movies to movie currently beingh viewed
  const similarMovieList = similarMovie.slice(0, 4).map((item, index) => {
    return (
      <div className="sml" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title}></img>
          </Link>
        </div>
        <div className="mt-3">
          {/* <p style={{ fontWeight: "bolder" }}>{item.title}</p> */}
          {/* <p>Rated: {item.rating}</p> */}
        </div>
      </div>
    );
  });
    return (
    <div>
         <Search />
        <div className='container' style={{ width: '1200px' }}>
        <MoviePlayerModal
        show={isOpen}
        onHide={() => {
            setIsOpen(false);
        }}
        >
        </MoviePlayerModal>
            <div className="col text-center" style={{ width: "100%", height: '100%' }}>
             <img
            className="img-fluid"
            src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
            alt={detail.title}> 
            </img>
           <div className='carousel-center'>
            <i 
            onClick={(e) => setIsOpen(true)}
            className='far fa-play-circle' style={{ fontSize: 100, color: 'orange'}}></i>
          </div>
          <div className='carousel-caption'
          style={{ textAlign:'center', fontSize: 50, fontWeight: 'bold', color: 'tomato'}}>
               {detail.title}</div>
        </div>
        <div className='row mt-3 container'>
            <div className="col">
            <ul className='list-inline'>
                {genresList}
            </ul>
         </div>
        </div> 
        <div className='mdc'>
            <p className='mdp'>{detail.overview}</p>
            </div>
               <div className='wrapper'>
               <div className='box3'>
                 <h1> RATING </h1>
                    <ReactStars
                    count={detail.vote_average}
                    size={20}
                    color={`#f4c10f`}
                    ></ReactStars>
            </div>
                <div className='box1'>
                    <div className='mdh'>
                    <h1> RELEASE DATE </h1>
                    <p className='mdp'>{detail.release_date}</p>
                </div>
            </div>
            <div className='box2'>
                    <div className='mdh'>
                    <h1> RUN TIME </h1>
                    <p className='mdp'>{detail.runtime} MINS</p>
                </div>
            </div>
            <div className='box4'>
                    <div className='mdh'>
                    <h1> BUDGET </h1>
                    <p className='mdp'>{detail.budget}</p>
                </div>
            </div>
            <div className='box5'>
                    <div className='mdh'>
                    <h1> HOMEPAGE </h1>
                    <a className='mdp'href={detail.homepage} target="blank">{detail.homepage}</a>
                </div>
            </div>
          </div>
            <div className="row mt-3">
        <div className="col">
          <h1 className='cast'>CAST</h1>
        </div>
      </div>
      <div className="cast-row">{castList}</div>
      <div>
        <div>
          <p className="similar-titles">
            SIMILAR TITLES 
          </p>
        </div>
      </div>
      <div className="similar-movie">{similarMovieList}</div>
       </div>
       <div>
       <div> Cast Person {castPerson} </div>
       </div>
     </div>
    );
}
