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
    videos: {
        results: Videos[]
    }
}

export interface Videos {
    key: string
}

export default function Banner() {

    const [movie, setMovie] = useState<Movie>()

    const [isClicked, setIsClicked] = useState(false)


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
        if (str === undefined) return ""
        return str.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    if (!isClicked) {
        return (
            <Header $backdropPath={movie?.backdrop_path}>
                <Contents>
                    <Title>
                        {movie?.title || movie?.name || movie?.original_name}
                    </Title>
                    <ButtonContainer>
                        <button className={"play-button"} onClick={() => {
                            if(movie?.videos.results[0]) {
                                setIsClicked(true)
                            }
                        }}>Play
                        </button>
                        <button className={"more-button"}><Space />More Information</button>
                    </ButtonContainer>

                    <Description>{truncate(100, movie?.overview)}</Description>

                </Contents>
                <FadeBottom/>
            </Header>
        );
    } else {
        return (
            <Container>
                <HomeContainer>
                    {movie?.videos.results[0] && <Iframe
                        width="640"
                        height="360"
                        src={`https://www.youtube.com/embed/${movie?.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie?.videos.results[0].key}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="autoplay; fullscreen"
                        allowFullScreen>

                    </Iframe>}



                </HomeContainer>
            </Container>
        )
    }
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
    width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;
  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Header = styled.header<{ $backdropPath: string | undefined }>`
  background-image: ${(props) =>
          props.$backdropPath ? `url('https://image.tmdb.org/t/p/original/${props.$backdropPath}')` : ""};
  background-position: top center;
  background-size: cover;

  color: white;
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;

  > button {
    cursor: pointer;
    outline: none;
    border: none;
    padding: 0.4rem 1.8rem 0.4rem 1rem;
    font-size: 1rem;
    font-weight: 700;
    border-radius: 0.4vw;
    text-align: start;

    &.play-button {
      background: #ffffff;
    }

    &.more-button {
      background: #4f4f4f;
      color: #ffffff;
    }

    &:hover {
      color: #000;
      background: rgba(170, 170, 170, 0.9);
      transition: all 0.2s;
    }
  }
`;

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
  background-image: linear-gradient(180deg,
  transparent,
  rgba(37, 37, 37, 0.61),
  #111);

  @media (min-width: 1500px) {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
`