import React, { useState, useEffect } from 'react';
import ReactPlayer from "react-player";
import { fetchMovieDetail, fetchMovieVideos } from '../service'
import 'react-bootstrap-carousel/dist/react-bootstrap-carousel.css';
import { Modal } from 'react-bootstrap';

export function MovieDetail({ match }) {

    let params = match.params;
    let genres = []; 
    const [isOpen, setIsOpen] = useState(false);
    const [detail, setDetail] = useState([]);
    const [video, setVideo] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDetail(await fetchMovieDetail(params.id));
            setVideo(await fetchMovieVideos(params.id));
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

    return (
    <div>
        <h1 className='logo'> PixtureBox </h1>
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
        <div className='row mt-3'>
            <div classname='col'>
                <p style={{ color: 'white'}}> GENRE </p>
            </div>
        </div>
        <div className='row mt-3'>
            <ul className='list-inline'>
                {genres && genresList}
            </ul>
        </div>  
        </div>
    </div>
    );
}