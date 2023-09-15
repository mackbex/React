import React, {useCallback, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import Form from "./components/Form";
import { DropResult} from "react-beautiful-dnd";
import List from "./components/List";

export interface PropsTodoData {
    id: number,
    title: string,
    completed: boolean
}

export default function App() {

    console.log("app")

    const [todoList, setTodoList] = useState<PropsTodoData[]>(() => {
        const lcTodo = localStorage.getItem("todo")
        return lcTodo ? JSON.parse(lcTodo) : []
    })

    const [title, setTitle] = useState("")

    const isFirstRun = useRef(true);
    useEffect(() => {
        if(isFirstRun.current) {
            isFirstRun.current = false
            return;
        }
        localStorage.setItem("todo",JSON.stringify(todoList))

    }, [todoList])

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleRemoveAll = () => {
        setTodoList([])
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

    const removeTodo = useCallback((id: Number) => {
        setTodoList(todoList.filter((data) => data.id !== id))
    },[todoList])

    const handleCheck = useCallback((id: Number) => {
        let newTodoData = todoList.map((data) => {
            if (data.id === id) {
                data.completed = !data.completed
            }
            return data
        });

        setTodoList(newTodoData)
        console.log("array", todoList)
    },[todoList])

    const handleEditTodo = useCallback((id: Number, title: string) => {
        let newTodoData = todoList.map((data) => {
            if (data.id === id) {
                data.title = title
            }
            return data
        });

        setTodoList(newTodoData)

    }, [todoList])

    const onDragStart = useCallback(() => {

    },[])

    const onDragEnd = useCallback((result: DropResult) => {
        if(!result.destination) return;

        const newTodoData = todoList;

        const [reordered] = newTodoData.splice(result.source.index, 1);

        newTodoData.splice(result.destination.index, 0, reordered);
        setTodoList(newTodoData);
     },[todoList])

    return (
        <Container>
            <TodoBlock>
                <TitleBlock>
                    <Title>Todo List</Title>
                    <ClearList
                        onClick={handleRemoveAll}
                    >clear</ClearList>
                </TitleBlock>

                <Form
                    title={title}
                    onSubmit={handleSubmit}
                    handleTitleChange={handleTitleChange}
                />

                <List
                    todoList={todoList}
                    removeTodo={removeTodo}
                    handleCheck={handleCheck}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    onEditDone={handleEditTodo}
                />

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

const TitleBlock = styled.div`
  display: flex;
  justify-content: space-between;
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

const ClearList = styled.button`
  display: inline-block;
  margin-bottom: 0.75rem;
  justify-content: space-between;
  align-items: center;
  
`;