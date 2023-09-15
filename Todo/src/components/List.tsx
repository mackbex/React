import {StrictModeDroppable} from "./StrictModeDroppable";
import {DragDropContext, Draggable, DropResult, OnDragEndResponder, OnDragStartResponder} from "react-beautiful-dnd";
import React, {memo} from "react";
import {PropsTodoData} from "../App";
import ListItem from "./ListItem";

interface Props {
    todoList: PropsTodoData[],
    removeTodo: (id: Number) => void,
    handleCheck: (id: Number) => void,
    onDragStart: OnDragStartResponder,
    onDragEnd: OnDragEndResponder,
    onEditDone: (id: Number, title: string) => void
}

function List({todoList, removeTodo, handleCheck, onDragStart, onDragEnd, onEditDone}: Props) {

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
                                        onEditDone={onEditDone}
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