import React, {memo, useMemo} from "react";
import styled from "styled-components";
import {PropsTodoData} from "../App";
import {DraggableProvided} from "react-beautiful-dnd";

interface Props {
    provided: DraggableProvided | null,
    todoData: PropsTodoData,
    removeTodo: (id: Number) => void,
    handleCheck: (id: Number) => void,
    isDragging: boolean
}

function ListItem({provided, todoData, removeTodo, handleCheck, isDragging}: Props) {

    const title = useMemo(() => {
        return todoData.title
    }, [todoData.title])
    return (
        <ItemDiv
            ref={provided?.innerRef}
            {...provided?.draggableProps}
            {...provided?.dragHandleProps}
        >
        <TodoItem key={todoData.id} $completed={todoData.completed} $isDragging={isDragging}>
            <label>
                <input type="checkbox" defaultChecked={todoData.completed}
                       onChange={() => handleCheck(todoData.id)}/>
                {title}
            </label>
            <RemoveTodo onClick={() => removeTodo(todoData.id)}>x</RemoveTodo>

        </TodoItem>
        </ItemDiv>
    );
}

export default memo(ListItem)

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