import axios from 'axios'

const apiKey = '63cad23fc5d27c914717d084f3379dd9';
const url = 'https://api.themoviedb.org/3';
const nowPlayingUrl = `${url}/movie/now_playing`;
const topratedUrl = `${url}/movie/top_rated`;
const movieUrl = `${url}/movie`;
const genreUrl = `${url}/genre/movie/list`;
const moviesUrl = `${url}/discover/movie`;
const queryUrl = `${url}/search/movie`
const getDetailsUrl = `${url}/person`

//fetching cast details
export const fetchSearchPerson = async () => {
    try {
        const { data } = await axios.get(getDetailsUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US'
            }
        })
        const modifiedData = data['results'].map((person) => ({
            id: person['id'],
            also_known_as: person['also_known_as'],
            birtday: person['birthday']
        }))

        return modifiedData;
    } catch (error) { }
}

//fetching now playing movies, shown on carousel at top of page
export const searchMovies = async () => {
    try {
        const { data } = await axios.get(queryUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        
//returns posters, showing the title, poster, overview, rating
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((movie) => ({
            id: movie['id'],
            backPoster: posterUrl + movie['backdrop_path'],
            title: movie['title'],
            poster: posterUrl + movie['poster_path'],
            overview: movie['overview'],
            rating: movie['vote_average'],
        }))

        return modifiedData;
    } catch (error) { }
}

//fetching now playing movies, shown on carousel at top of page
export const fetchMovies = async () => {
    try {
        const { data } = await axios.get(nowPlayingUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1
            }
        })
        
//returns posters, showing the title, poster, overview, rating
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((movie) => ({
            id: movie['id'],
            backPoster: posterUrl + movie['backdrop_path'],
            title: movie['title'],
            poster: posterUrl + movie['poster_path'],
            overview: movie['overview'],
            rating: movie['vote_average'],
        }))

        return modifiedData;
    } catch (error) { }
}

// fetches Genre list
export const fetchGenre = async () => {
    try {
        const { data } = await axios.get(genreUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US'
            }
        })
        const modifiedData = data['genres'].map((genre) => ({
            id: genre['id'],
            name: genre['name']
        }))
        return modifiedData;
    } catch (error) { }
}

//fetches movie by genre, renders them on the mage
export const fetchMovieByGenre = async (genre_id) => {
    try {
        const { data } = await axios.get(moviesUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 1,
                with_genres: genre_id
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((movie) => ({
            id: movie['id'],
            backPoster: posterUrl + movie['backdrop_path'],
            popularity: movie['popularity'],
            title: movie['title'],
            poster: posterUrl + movie['poster_path'],
            overview: movie['overview'],
            rating: movie['vote_average'],
            production_companies: movie ['production_companies']
        }))

        return modifiedData;
    } catch (error) { }
}


//top rated movies returned 
export const fetchTopratedMovie = async () => {
    try {
        const { data } = await axios.get(topratedUrl, {
            params: {
                api_key: apiKey,
                language: 'en_US',
                page: 2
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((movie) => ({
            id: movie['id'],
            backPoster: posterUrl + movie['backdrop_path'],
            popularity: movie['popularith'],
            title: movie['title'],
            poster: posterUrl + movie['poster_path'],
            overview: movie['overview'],
            rating: movie['vote_average'],
        }))
        return modifiedData;
    } catch (error) { }
}

//fetches movie details
export const fetchMovieDetail = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}`, {
            params: {
                api_key: apiKey,
                language: 'en_US'
            }
        });
        return data;
    } catch (error) { }
}

//fetches trailers for movies
export const fetchMovieVideos = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}/videos`, {
            params: {
                api_key: apiKey,
            }
        });
        return data['results'][0];
    } catch (error) { }
}

//fetches casts for movie
export const fetchCasts = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}/credits`, {
            params: {
                api_key: apiKey,
            }
        });
        const modifiedData = data['cast'].map((cast) => ({
            id: cast['cast_id'],
            character: cast['character'],
            name: cast['name'],
            img: 'https://image.tmdb.org/t/p/w200' + cast['profile_path'],
        }))

        return modifiedData;
    } catch (error) { }
}

//fetches similar movies to current movie being viewed
export const fetchSimilarMovie = async (id) => {
    try {
        const { data } = await axios.get(`${movieUrl}/${id}/similar`, {
            params: {
                api_key: apiKey,
                language: 'en_US'
            }
        });
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((movie) => ({
            id: movie['id'],
            backPoster: posterUrl + movie['backdrop_path'],
            popularity: movie['popularith'],
            title: movie['title'],
            poster: posterUrl + movie['poster_path'],
            overview: movie['overview'],
            rating: movie['vote_average'],
        }))

        return modifiedData;
    } catch (error) { }
}