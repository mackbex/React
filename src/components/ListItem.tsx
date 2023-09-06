import React, {memo, useCallback, useMemo, useState} from "react";
import styled from "styled-components";
import {PropsTodoData} from "../App";
import {DraggableProvided} from "react-beautiful-dnd";

interface Props {
    provided: DraggableProvided | null,
    todoData: PropsTodoData,
    removeTodo: (id: Number) => void,
    handleCheck: (id: Number) => void,
    isDragging: boolean,
    onEditDone: (id: Number, title: string) => void
}

function ListItem({provided, todoData, removeTodo, handleCheck, isDragging, onEditDone}: Props) {

    const [isHovering, setIsHovering] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editedTitle, setEditedTitle] = useState<string>(todoData.title)

    const handleHover = (isHovering: boolean) => {
        console.log("handleHover")
        setIsHovering(isHovering)
    }
    const handleEditTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handleEditTitle")
        setEditedTitle(e.target.value)
    }

    const handleSave = (id: Number, title: string) => {
        console.log("handleSave")
        setIsEditing(false)
        onEditDone(id, title)
    }

    return (
        <ItemDiv
            ref={provided?.innerRef}
            {...provided?.draggableProps}
            {...provided?.dragHandleProps}
        >
            <TodoItem
                key={todoData.id}
                $completed={todoData.completed}
                $isDragging={isDragging}
                onMouseOver={() => handleHover(true)}
                onMouseOut={() => handleHover(false)}
            >
                <label>
                    <input type="checkbox" defaultChecked={todoData.completed}
                           onChange={() => handleCheck(todoData.id)}/>

                    {isEditing ?
                        <input
                            value={editedTitle}
                            onChange={handleEditTitle}
                        />
                        : todoData.title}
                </label>
                {(isHovering || isEditing) &&
                    (
                        isEditing ? <Save onClick={() => handleSave(todoData.id, editedTitle)}>save</Save>
                            : <Edit onClick={() => setIsEditing(!isEditing)}>edit</Edit>
                    )
                }

                <RemoveTodo onClick={() => removeTodo(todoData.id)}>X</RemoveTodo>

            </TodoItem>
        </ItemDiv>
    );
}

export default memo(ListItem)

const TodoItem = styled.div<{ $completed: boolean, $isDragging: boolean }>`
  display: flex;
  padding: 0.25rem 1rem;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.25rem;
  border-width: 1px;
  color: #4B5563;
  background-color: ${props => props.$isDragging ? "#89898c" : "#F3F4F6"};

  label {
    text-decoration: ${props => props.$completed ? 'line-through' : 'none'};
  }
`;

const ItemDiv = styled.div`
  padding: 0.25rem 0;
`;

const Edit = styled.button`
  background-color: transparent;
  background-repeat: no-repeat;
  margin-left: auto;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
`;

const Save = styled.button`
  background-color: transparent;
  background-repeat: no-repeat;
  margin-left: auto;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
`;

const RemoveTodo = styled.button`
  display: flex;
  padding: 0.5rem 1rem;
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
`;