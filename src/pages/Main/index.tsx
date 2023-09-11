
import React from "react";
import Banner from "../../components/Banner";
import Row from "../../components/Row";
import requests from "../../api/requests";

export default function Main() {
    return (
        <div>
            <Banner />
            <Row title={"Trending Now"} id="TN" fetchUrl={requests.fetchTrending} isLargeRow={true}/>
            <Row title={"Top Rated"} id="TR" fetchUrl={requests.fetchTopRated}/>
            <Row title={"Action Movies"} id="AM" fetchUrl={requests.fetchActionMovies}/>
            <Row title={"Comedy Movies"} id="TN" fetchUrl={requests.fetchComedyMovies}/>
            <Row title={"Horror Movies"} id="TN" fetchUrl={requests.fetchHorrorMovies}/>
            <Row title={"Romance Movies"} id="TN" fetchUrl={requests.fetchRomanceMovies}/>
            <Row title={"Documentaries"} id="TN" fetchUrl={requests.fetchDocumentaries}/>
        </div>
    )
}
