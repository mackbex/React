import Nav from "./components/Nav";
import React from "react";
import Banner from "./components/Banner";
import Row from "./components/Row";
import requests from "./api/requests";
import styled from "styled-components";
import Footer from "./components/Footer";

export default function App() {
    return (
    <AppContainer>
        <Nav />
        <Banner />
        <Row title={"Trending Now"} id="TN" fetchUrl={requests.fetchTrending} isLargeRow={true}/>
        <Row title={"Top Rated"} id="TR" fetchUrl={requests.fetchTopRated}/>
        <Row title={"Action Movies"} id="AM" fetchUrl={requests.fetchActionMovies}/>
        <Row title={"Comedy Movies"} id="TN" fetchUrl={requests.fetchComedyMovies}/>
        <Row title={"Horror Movies"} id="TN" fetchUrl={requests.fetchHorrorMovies}/>
        <Row title={"Romance Movies"} id="TN" fetchUrl={requests.fetchRomanceMovies}/>
        <Row title={"Documentaries"} id="TN" fetchUrl={requests.fetchDocumentaries}/>
        <Footer/>
    </AppContainer>
    )
}

const AppContainer = styled.div`
  background: #111;
`