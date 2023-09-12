import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import axios from "../../api/axios";
import {Movie} from "../../components/Banner";
import "./index.css"
import useDebounce from "../../hooks/useDebounce";

export default function Search() {

    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }

    let query = useQuery();
    const searchTerm = useDebounce(query.get("q"), 500)
    const [searchResults, setSearchResults] = useState<Movie[]>([])

    useEffect(() => {
        if(searchTerm) {
            console.log("start")
            fetchSearchMovie(searchTerm)
        }
    }, [searchTerm]);


    const fetchSearchMovie = async (term: string) => {
        try {
            const request = await axios.get(
                `/search/multi?include_adult=false&query=${term}`
            )

            setSearchResults(request.data.results)
        }
        catch (e) {
            console.log("error", e)
        }
    }

    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <section className="search-container">
                {searchResults.map((movie) => {
                    if (movie.backdrop_path !== null && movie.media_type !== "person") {
                        const movieImageUrl =
                            "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
                        return (
                            <div className="movie" key={movie.id}>
                                <div
                                    // onClick={() => navigate(`/${movie.id}`)}
                                    className="movie__column-poster"
                                >
                                    <img
                                        src={movieImageUrl}
                                        alt="movie"
                                        className="movie__poster"
                                    />
                                </div>
                            </div>
                        );
                    }
                })}
            </section>
        ) : (
            <section className="no-results">
                <div className="no-results__text">
                    <p>
                        찾고자하는 검색어"{searchTerm}"에 맞는 영화가 없습니다.
                    </p>
                </div>
            </section>
        );
    };

    return renderSearchResults();
}
 