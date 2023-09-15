import React, {useEffect, useRef, useState} from 'react';
import axios from "../api/axios";
import "./Row.css"
import MovieModal from "./MovieModal";
import {initialMovieState, Movie} from "./Banner";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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

                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        1378: {
                            slidesPerView: 6,
                            slidesPerGroup: 6
                        },
                        998: {
                            slidesPerView: 5,
                            slidesPerGroup: 5
                        },
                        625: {
                            slidesPerView: 4,
                            slidesPerGroup: 4
                        },
                        0: {
                            slidesPerView: 3,
                            slidesPerGroup: 3
                        }
                    }}
                    >
                    <div id={id} className={"row__posters"}>
                        {movies.map((movie) => (
                            <SwiperSlide>
                                <img
                                    key={movie.id}
                                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                    src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                    loading={"lazy"}
                                    alt={movie.title}
                                    onClick={() => { handleClick(movie)}}
                                />
                            </SwiperSlide>

                        ))}
                    </div>
                </Swiper>
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
