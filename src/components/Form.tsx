import React, {ChangeEventHandler} from 'react';
import styled from "styled-components";
import {PropsTodoData} from "../App";

interface Props {
    title: string,
    onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void,
    handleTitleChange: ChangeEventHandler<HTMLInputElement>
}

export default function Form({onSubmit, title, handleTitleChange}: Props) {

    console.log("form")
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
  padding: 0.5rem 0.75rem;
  margin-right: 1rem;
  border-radius: 0.25rem;
  border-width: 1px;
  width: 100%;
  color: #6B7280;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const TodoSubmit = styled.input`
  padding: 0.5rem;
  border-width: 2px;
  background-color: #ffffff;
  border-color: #60A5FA;
  color: #60A5FA;
  border-radius: 0.25rem;

  &:hover {
    color: #ffffff;
    background-color: #BFDBFE;
  }

`;

const TodoForm = styled.form`
  display: flex;
  padding-bottom: 0.5rem;

  ${TodoInput} {
    flex: 10;
  }

  ${TodoSubmit} {
    flex: 1;
  }
`;