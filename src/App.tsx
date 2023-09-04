import React, {useState} from "react";
import styled from "styled-components";
import ListItem from "./components/ListItem";
import Form from "./components/Form";
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import {StrictModeDroppable} from "./components/StrictModeDroppable";

export interface PropsTodoData {
    id: number,
    title: string,
    completed: boolean
}

export default function App() {

    const [todoList, setTodoList] = useState<PropsTodoData[]>([
        {
            id: 1,
            title: "Study",
            completed: true
        },
        {
            id: 2,
            title: "Cleaning",
            completed: false
        }
    ])

    const [title, setTitle] = useState("")

    const removeTodo = (id: Number) => {
        setTodoList(todoList.filter((data) => data.id !== id))
    }


    const handleCheck = (id: Number) => {
        let newTodoData = todoList.map((data) => {
            if (data.id === id) {
                data.completed = !data.completed
            }
            return data
        });

        setTodoList(newTodoData)
        console.log("array", todoList)
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title) return;

        let newTodoData = {
            id: Date.now(),
            title: title,
            completed: false
        }
        setTodoList(prev =>
            [...prev, newTodoData]
        );
        setTitle("")
    }

    const onDragStart = () => {}
    const onDragEnd = (result: DropResult) => {
        if(!result.destination) return;

        const newTodoData = todoList;

        const [reordered] = newTodoData.splice(result.source.index, 1);

        newTodoData.splice(result.destination.index, 0, reordered);
        setTodoList(newTodoData);

    }

    return (
        <Container>
            <TodoBlock>
                <Title>Todo List</Title>

                <Form
                    title={title}
                    onSubmit={handleSubmit}
                    handleTitleChange={handleTitleChange}
                />

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

                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <ListItem
                                                todoData={data}
                                                removeTodo={removeTodo}
                                                handleCheck={handleCheck}
                                                isDragging={snapshot.isDragging}
                                            />

                                        </div>


                                    )}
                                </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </StrictModeDroppable>
                </DragDropContext>
            </TodoBlock>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  
  background-color: #DBEAFE;
`;

const TodoBlock = styled.div`
  padding: 1.5rem;
  margin: 1rem;
  border-radius: 0.25rem;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

  @media (min-width: 1024px) {
    width: 75%;
  }
  @media (min-width: 1024px) {
    max-width: 32rem;
  }

`;
const Title = styled.h1`
  display: flex;
  margin-bottom: 0.75rem;
  justify-content: space-between;
`;
