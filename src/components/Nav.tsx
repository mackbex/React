import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

export default function Nav() {

    const [show, setShow] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
        navigate(`/search?q=${e.target.value}`)
    }

    return (
        <Navigation $show={show}>
            <Logo
                alt={'Netflix logo'}
                src={require("../assets/logo.png")}
                onClick={() => window.location.reload()}
            />

            <Search
                value={searchValue}
                onChange={handleChange}
                type={"text"}
                placeholder={"input movie title."}
            />
            <User
                alt={'User'}
                src={require("../assets/user.png")}
            />

        </Navigation>
    );
}

const Navigation = styled.nav<{$show: boolean}>`
  position: fixed;
  top: 0;
  width: 100%;
  height: 30px;
  z-index: 999;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition-timing-function: ease-in;
  transition: all 0.5s;
  background-color: ${props => props.$show ? "#111" : "none" } ;
`

const Search = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background: #000000c7;
  border-radius: 5px;
  color:white;
  padding: 5px;
  border: none;
`

const Logo = styled.img`
  position: fixed;
  left: 40px;
  width: 80px;
  object-fit: contain;
  cursor: pointer;
`

const User = styled.img`
  position: fixed;
  right: 40px;
  width: 30px;
  object-fit: contain;
  cursor: pointer;
`