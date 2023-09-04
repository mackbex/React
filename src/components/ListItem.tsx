import styled from "styled-components";
import {PropsTodoData} from "../App";

interface Props {
    todoData: PropsTodoData,
    removeTodo: (id: Number) => void,
    handleCheck: (id: Number) => void
}

export default function ListItem({todoData, removeTodo, handleCheck}: Props) {
    return (
        <TodoItem key={todoData.id} completed={todoData.completed}>
            <label>
                <input type="checkbox" defaultChecked={todoData.completed}
                       onChange={() => handleCheck(todoData.id)}/>
                {todoData.title}
            </label>
            <RemoveTodo onClick={() => removeTodo(todoData.id)}>x</RemoveTodo>
        </TodoItem>
    );
}

const TodoItem = styled.div<{ completed: boolean }>`
  display: flex;
  padding: 0.25rem 1rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.25rem;
  border-width: 1px;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  color: #4B5563;
  background-color: #F3F4F6;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`;

const RemoveTodo = styled.button`
  float: right;
  padding: 0.5rem 1rem;
  border: 0;
`;