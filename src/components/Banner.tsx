import React, {useEffect, useState} from 'react';
import requests from "../api/requests";
import axios from "../api/axios";
import styled from "styled-components";

export interface Movie {
    title: string,
    name: string,
    original_name: string,
    overview: string,
    backdrop_path: string,
}

export default function Banner() {

    const [movie, setMovie] = useState<Movie>()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const {data: playNow} = await axios.get(requests.fetchNowPlaying)

        const movieId = playNow.results[
            Math.floor(Math.random() * playNow.results.length)
            ].id

        const {data: movieDetail} = await axios.get(`movie/${movieId}`, {
            params: {append_to_response: "videos"},
        })

        console.log(movieDetail)
        setMovie(movieDetail)
    }


    const truncate = (n: number, str?: string) => {
        if(str === undefined) return ""
        return str.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <Header $backdropPath={movie?.backdrop_path}>
            <Contents>
                <Title>
                    {movie?.title || movie?.name || movie?.original_name}
                </Title>
                <Buttons>
                    <Play as={SharedButtonStyles}>Play</Play>
                    <Info as={SharedButtonStyles}><Space/>More Information</Info>
                </Buttons>

                <Description>{truncate(100, movie?.overview)}</Description>

            </Contents>
            <FadeBottom/>
        </Header>
    );
}


const Header = styled.header<{ $backdropPath: string | undefined }>`
  background-image: ${(props) =>
          props.$backdropPath ? `url('https://image.tmdb.org/t/p/original/${props.$backdropPath}')` : ""};
  background-position: top center;
  background-size: cover;
  
  color:white;
  object-fit: contain;
  height: 448px;
  
  @media (min-width: 1500px) {
    position: relative;
    height: 600px;
  }
`
const Contents = styled.div`
  position: relative;
  margin-left: 40px;
  padding-top: 140px;
  height: 190px;
  z-index: 2;
  
  @media (max-width: 768px) {
    width: min-content !important;
    padding-left: 2.3rem;
    margin-left: 0 !important;
  }
`

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  padding-bottom: 0.5rem;
`

const SharedButtonStyles = styled.div`
  justify-content: start;
  align-items: center;
  cursor: pointer;
  outline: none;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 0.2vw;
  padding: 0.4rem 1.8rem 0.4rem 1rem;
  margin-right: 1rem;
`
const Buttons = styled(SharedButtonStyles)`
  display: flex;
  flex-direction: row;
`

const Play = styled.button`
  ${SharedButtonStyles};
  background-color: white;
  color: black;

  &:hover {
    color: #000;
    background-color: rgba(170, 170, 170, 0.9);
    transition: all 0.2s;
  }
`

const Info = styled.button`
  background-color: rgba(109, 109, 110, 0.7);
  color: white;

  &:hover {
    background-color: rgb(74, 74, 74);
    color: white;
  }

  @media (max-width: 768px) {
    text-align: start;
    padding-right: 1.2rem;
  }
`

const Space = styled.div`
  margin-left: 4px;
  @media (min-width: 768px) {
    margin-left: 6px;
  }
`

const Description = styled.h2`
  width: 45rem;
  line-height: 1.3;
  padding-top: 1rem;
  font-weight: 500;
  font-size: 1rem;
  max-width: 400px;
  height: 80px;
  @media (max-width: 768px) {
    font-size: 0.8rem !important;
    width: auto !important;
  }
`

const FadeBottom = styled.div`
  height: 7.4rem;
  background-image: linear-gradient(
          180deg,
          transparent,
          rgba(37, 37, 37, 0.61),
          #111
  );
  
  @media (min-width: 1500px) {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40rem;
  }
`