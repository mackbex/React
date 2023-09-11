import React, {useEffect, useState} from 'react';
import axios from "../api/axios";
import "./Row.css"
import MovieModal from "./MovieModal";
import {initialMovieState, Movie} from "./Banner";

interface RowData {
    title: string,
    id: string,
    fetchUrl: string,
    isLargeRow?: boolean
}


export default function Row({title, id, fetchUrl, isLargeRow = false}: RowData) {

    const [movies, setMovies] = useState<Movie[]>([])
    const [modelOpen, setModalOpen] = useState(false)
    const [movieSelected, setMovieSelected] = useState<Movie>(initialMovieState)

    useEffect(() => {
        fetchMovieData()
    }, []);

    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl)
        setMovies(request.data.results)
    }

    const handleClick = (movie: Movie) => {
        setModalOpen(true)
        setMovieSelected(movie)
    }

    return (
        <section className={"row"}>
            <h2>{title}</h2>
            <div className={"slider"}>
                <div className={"slider__arrow-left"} onClick={() => {
                    const el = window.document.getElementById(id)
                    if (!el) return;
                    el.scrollLeft -= window.innerWidth - 80;
                }}>
                    <span className={"arrow"}>{"<"}</span>
                </div>
                <div id={id} className={"row__posters"}>
                    {movies.map((movie) => (
                        <img
                            key={movie.id}
                            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            loading={"lazy"}
                            alt={movie.title}
                            onClick={() => { handleClick(movie)}}
                        />
                    ))}
                </div>
                <div className={"slider__arrow-right"} onClick={() => {
                    const el = window.document.getElementById(id)
                    if (!el) return;
                    el.scrollLeft += window.innerWidth - 80;
                }}>
                <span
                    className={"arrow"}
                >
                    {">"}
                </span>
                </div>
            </div>
            {modelOpen &&
                <MovieModal
                    {...movieSelected}
                    setModalOpen={setModalOpen}
                />
            }
        </section>
    );
}
