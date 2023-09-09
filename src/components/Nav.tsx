import React, {useEffect, useState} from 'react';
import styled from "styled-components";

export default function Nav() {

    const [show, setShow] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])

    return (
        <Navigation $show={show}>
            <Logo
                alt={'Netflix logo'}
                src={require("../assets/logo.png")}
                onClick={() => window.location.reload()}
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
  z-index: 1;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition-timing-function: ease-in;
  transition: all 0.5s;
  background-color: ${props => props.$show ? "#111" : "none" } ;
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