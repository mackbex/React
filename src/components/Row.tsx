import React, {useEffect, useState} from 'react';
import axios from "../api/axios";
import styled from "styled-components";
import "./Row.css"

interface RowData {
    title: string,
    id: string,
    fetchUrl: string,
    isLargeRow?: boolean
}

interface Movie {
    title: string,
    poster_path: string,
    backdrop_path: string,
    id: number
}

export default function Row({title, id, fetchUrl, isLargeRow = false}: RowData) {

    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
        fetchMovieData()
    }, []);

    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl, {
            // headers: {Authorization: `Bearer ${axios.to}`}
        })
        setMovies(request.data.results)
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
        </section>
    );
}
