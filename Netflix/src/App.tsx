import Nav from "./components/Nav";
import React from "react";
import Footer from "./components/Footer";
import {Outlet, Route, Routes} from "react-router-dom";
import styled from "styled-components";
import Main from "./pages/Main";
import Search from "./pages/Search";
import Detail from "./pages/Detail";

const Layout = () => {
    return(
        <div>
            <Nav />
            <Outlet />
            <Footer />
        </div>
    )
}

const App = () => {
    return(
        <AppContainer>
            <Routes>
                <Route path={"/"} element={<Layout />} >
                    <Route index element={<Main />}  />
                    <Route path={":movieId"} element={<Detail />}  />
                    <Route path={"search"} element={<Search />}  />
                </Route>
            </Routes>
        </AppContainer>
    )
}

export default App

const AppContainer = styled.div`
  background: #111;
`