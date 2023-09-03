import styled from "styled-components";
import {PropsTodoData} from "../App";

export interface PropsListItem {
    todoData: PropsTodoData,
    removeTodo: (id: Number) => void,
    handleCheck: (id: Number) => void
}

export default function ListItem({ todoData, removeTodo, handleCheck }: PropsListItem) {

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
  padding: 10px;
  border-bottom: 1px #ccc dotted;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`;

const RemoveTodo = styled.button`
  color: #fff;
  border: none;
  padding: 5px 9px;
  border-radius: 50%;
  cursor: pointer;
  float: right;
`;