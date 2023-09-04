import styled from "styled-components";
import {PropsTodoData} from "../App";

interface Props {
    todoData: PropsTodoData,
    removeTodo: (id: Number) => void,
    handleCheck: (id: Number) => void,
    isDragging: boolean
}

export default function ListItem({todoData, removeTodo, handleCheck, isDragging}: Props) {
    return (

        <ItemDiv>
        <TodoItem key={todoData.id} $completed={todoData.completed} $isDragging={isDragging}>
            <label>
                <input type="checkbox" defaultChecked={todoData.completed}
                       onChange={() => handleCheck(todoData.id)}/>
                {todoData.title}
            </label>
            <RemoveTodo onClick={() => removeTodo(todoData.id)}>x</RemoveTodo>

        </TodoItem>
        </ItemDiv>
    );
}

const TodoItem = styled.div<{ $completed: boolean, $isDragging: boolean }>`
  display: flex;
  padding: 0.25rem 1rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.25rem;
  border-width: 1px;

  color: #4B5563;
  background-color: ${props => props.$isDragging ? "#89898c" : "#F3F4F6"};
  text-decoration: ${props => props.$completed ? 'line-through' : 'none'};
`;

const ItemDiv = styled.div`
    padding: 0.25rem 0;
`;

const RemoveTodo = styled.button`
  float: right;
  padding: 0.5rem 1rem;
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
`;