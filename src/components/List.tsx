import {StrictModeDroppable} from "./StrictModeDroppable";
import {DragDropContext, Draggable, DraggableProvided, DropResult} from "react-beautiful-dnd";
import ListItem from "./ListItem";
import React, {memo} from "react";
import {PropsTodoData} from "../App";

interface Props {
    todoList: PropsTodoData[],
    setTodoList: React.Dispatch<React.SetStateAction<PropsTodoData[]>>,
    handleCheck: (id: Number) => void,
    removeTodo: (id: Number) => void
}

function List({todoList, setTodoList, handleCheck, removeTodo}: Props) {
    console.log("list")

    const onDragStart = () => {}
    const onDragEnd = (result: DropResult) => {
        if(!result.destination) return;

        const newTodoData = todoList;

        const [reordered] = newTodoData.splice(result.source.index, 1);

        newTodoData.splice(result.destination.index, 0, reordered);
        setTodoList(newTodoData);
    }

    return(
        <DragDropContext
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}>
            <StrictModeDroppable droppableId={"to-dos"}>
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>

                        {todoList.map((data, index) => (
                            <Draggable
                                key={data.id}
                                draggableId={data.id.toString()}
                                index={index}>
                                {(provided, snapshot) => (

                                    <ListItem
                                        provided={provided}
                                        todoData={data}
                                        removeTodo={removeTodo}
                                        handleCheck={handleCheck}
                                        isDragging={snapshot.isDragging}
                                    />
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </StrictModeDroppable>
        </DragDropContext>
    )
}

export default memo(List)