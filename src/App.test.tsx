import React from 'react'
import App, {OnOffBtn} from "./App";
import {fireEvent, render, screen} from "@testing-library/react";
import renderer from 'react-test-renderer'
import 'jest-styled-components'

test('counter start from 0', () => {
    render(<App />)
    const counterElement = screen.getByTestId("counter")
    expect(counterElement).toHaveTextContent("0")
})

describe("button control", () => {
    test("minus button", () => {
        render(<App />)
        const buttonElement = screen.getByTestId("minus-btn")
        expect(buttonElement).toHaveTextContent("-")
    })

    test("minus button clicked", () => {
        render(<App />)
        const buttonElement = screen.getByTestId("minus-btn")
        fireEvent.click(buttonElement)
        const counterElement = screen.getByTestId("counter")
        expect(counterElement).toHaveTextContent("-1")
    })

    test("plus button", () => {
        render(<App />)
        const buttonElement = screen.getByTestId("plus-btn")
        expect(buttonElement).toHaveTextContent("+")
    })

    test("plus button clicked", () => {
        render(<App />)
        const buttonElement = screen.getByTestId("plus-btn")
        fireEvent.click(buttonElement)
        const counterElement = screen.getByTestId("counter")
        expect(counterElement).toHaveTextContent("1")
    })

    test("on/off button has blue color", () => {
        const btn = renderer.create(<OnOffBtn />).toJSON()
        expect(btn).toHaveStyleRule( 'background-color', 'blue' )
    })

    test("on/off button enable/disable", () => {
        render(<App />)

        const btn = screen.getByTestId("on/off-btn")
        fireEvent.click(btn)

        const plusBtn = screen.getByTestId("plus-btn")
        expect(plusBtn).toBeDisabled()
    })
})