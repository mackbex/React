import React, {ChangeEventHandler} from 'react';
import styled from "styled-components";
import {PropsTodoData} from "../App";

interface Props {
    title: string,
    onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void,
    handleTitleChange: ChangeEventHandler<HTMLInputElement>
}

export default function Form({onSubmit, title, handleTitleChange}: Props) {

    return (
        <TodoForm onSubmit={onSubmit}>
            <TodoInput
                type="text"
                name="value"
                placeholder="input todo"
                value={title}
                onChange={handleTitleChange}
            />
            <TodoSubmit
                type={"submit"}
                value={"Input"}
            />
        </TodoForm>
    );
}

const TodoInput = styled.input`
  padding: 5px;
`;

const TodoSubmit = styled.input``;

const TodoForm = styled.form`
  display: flex;

  ${TodoInput} {
    flex: 10;
  }

  ${TodoSubmit} {
    flex: 1;
  }
`;