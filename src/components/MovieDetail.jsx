import React, { useState, useEffect } from 'react';
import ReactPlayer from "react-player";
import { fetchMovieDetail, fetchMovieVideos, fetchCasts, fetchSimilarMovie } from '../service'
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { Modal } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { Link, NavLink } from 'react-router-dom';

export function MovieDetail({ match }) {

    let params = match.params;
    let genres = []; 
    const [isOpen, setIsOpen] = useState(false);
    const [detail, setDetail] = useState([]);
    const [video, setVideo] = useState([]);
    const [casts, setCasts] = useState([]);
    const [similarMovie, setSimliarMovie] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDetail(await fetchMovieDetail(params.id));
            setVideo(await fetchMovieVideos(params.id));
            setCasts(await fetchCasts(params.id));
            setSimliarMovie(await fetchSimilarMovie(params.id))
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
            aria-labelledby='contained-modal-title-vcenter'
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title
                id='container-modal-title-vcenter'
                style={{ color: 'black', fontWeight: 'bolder' }}
                >
                {detail.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: 'black' }}>
                <ReactPlayer
                className='container-fluid'
                url={youtubeUrl + video.key} 
                playing
                width='100%'
                >
                </ReactPlayer>
            </Modal.Body>
            </Modal>
        );
    };

    let genresList;
  if (genres) {
    genresList = genres.map((g, i) => {
      return (
        <li className="list-inline-item"  key={i}>
          <button type="button" className="btn btn-outline-info" className='btn' style={{ color: 'tomato' }}>
            {g.name}
          </button>
        </li>
      );
    });
  }

  const castList = casts.slice(0, 4).map((c, i) => {
    return (
      <div className="col-md-3 text-center" key={i}>
        <img
          className="img-fluid rounded-circle mx-auto d-block"
          src={c.img}
          alt={c.name}
        ></img>
        <p className="font-weight-bold text-center">{c.name}</p>
        <p
          className="font-weight-light text-center"
          style={{ color: "white" }}
        >
          {c.character}
        </p>
      </div>
    );
  });


  const similarMovieList = similarMovie.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title}></img>
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <p>Rated: {item.rating}</p>
          <ReactStars
            count={item.rating}
            size={20}
            color={`#f4c10f`}
          ></ReactStars>
        </div>
      </div>
    );
  });

    return (
    <div>
        <NavLink className='logo' to='/' exact> PIXTUREBOX</NavLink>
            <div className='container'>
        <MoviePlayerModal
        show={isOpen}
        onHide={() => {
            setIsOpen(false);
        }}
        >
        </MoviePlayerModal>
            <div className="col text-center" style={{ width: "100%" }}>
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
        {/* <div className='container'>
            <div classname='col'>
                <p style={{ color: 'white'}}> GENRE </p>
            </div> */}
        {/* </div> */}
        <div className='row mt-3'>
            <div className="col">
            <ul className='list-inline'>
                {genresList}
            </ul>
        </div>
        </div> 
        <div className='row-mt-3'>
            <div className='col'>
                <div className='text-center'>
                    <ReactStars
                    count={detail.vote_average}
                    size={20}
                    color={`#f4c10f`}
                    ></ReactStars>
                </div>
        <div className='mt-3'>
            <h1> OVERVIEW </h1>
            <p style={{ color: "#f4c10f", fontSize: 20}}>{detail.overview}</p>
                </div>
                <div className='row mt-3'>
                    <div className='col'>
                    <h1> RELEASE DATE </h1>
                    <p style={{ color: "#f4c10f", fontSize: 20 }}>{detail.release_date}</p>
                </div>
            </div>
            <div className='row mt-3'>
                    <div className='col'>
                    <h1> RUN TIME </h1>
                    <p style={{ color: "#f4c10f", fontSize: 20 }}>{detail.runtime} MINS</p>
                </div>
            </div>
            <div className='row mt-3'>
                    <div className='col'>
                    <h1> BUDGET </h1>
                    <p style={{ color: "#f4c10f", fontSize: 20 }}>{detail.budget}</p>
                </div>
            </div>
            <div className='row mt-3'>
                    <div className='col'>
                    <h1> HOMEPAGE </h1>
                    <a  style={{ color: "#f4c10f", fontSize: 20 }} href={detail.homepage} target="_blank">{detail.homepage}</a>
                </div>
            </div>
            <div className="row mt-3">
        <div className="col">
          <p style={{ color: "white", fontWeight: "bolder" }}>CASTS</p>
        </div>
      </div>
      <div className="row mt-3">{castList}</div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "white", fontWeight: "bolder" }}>
            SIMILAR TITLES 
          </p>
        </div>
      </div>

      <div className="row mt-3">{similarMovieList}</div>
        </div>
        </div> 
     </div>
    </div>
    );
}