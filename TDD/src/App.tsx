import React, {useState} from "react";
import styled from "styled-components";
import {Simulate} from "react-dom/test-utils";
import ended = Simulate.ended;


const App = () => {

    const [count, setCount] = useState(0)
    const [disabled, setDisabled] = useState(false)
    return(
        <div className={"App"}>
            <header className={"App-header"}>
                <h3 data-testid={"counter"}>{count}</h3>
            </header>
            <div>
                <button
                    data-testid={"minus-btn"}
                    onClick={() => { setCount((prev) => prev - 1) }}
                    disabled={disabled}
                >-</button>
                <button
                    data-testid={"plus-btn"}
                    onClick={() => { setCount((prev) => prev + 1) }}
                    disabled={disabled}
                >+</button>
            </div>
            <OnOffBtn
                data-testid={"on/off-btn"}
                onClick={() => {
                    setDisabled((prev) => !prev)
                }}
            >on/off</OnOffBtn>
        </div>
    )
}

export const OnOffBtn = styled.button`
  background-color: blue;
`

export default App
