import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "../../api/axios";
import {initialMovieState, Movie} from "../../components/Banner";

export default function Detail() {

    let { movieId } = useParams()
    const [movie, setMovie] = useState<Movie>(initialMovieState)

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}`
                )
                setMovie(request.data)
            }
            catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [movieId]);

    if (!movie) return (<div>...Loading</div>)
    return (
        <section>
            <img
                className={"modal__poster-img"}
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt={""}
            />
        </section>
    );
}
 