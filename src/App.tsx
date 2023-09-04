import React, {useState} from "react";
import styled from "styled-components";
import ListItem from "./components/ListItem";
import Form from "./components/Form";

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

    return (
        <Container>
            <TodoBlock>
                <Title>Todo List</Title>

                <Form
                    title={title}
                    onSubmit={handleSubmit}
                    handleTitleChange={handleTitleChange}
                />

                {todoList.map(data => (
                    <ListItem
                        todoData={data}
                        removeTodo={removeTodo}
                        handleCheck={handleCheck}
                    />
                ))}
            </TodoBlock>
        </Container>
    )
}

const Container = styled.div`
  margin: auto;
  max-width: 600px;
`;

const TodoBlock = styled.div`
  padding: 30px;
  margin-top: 50px;
  background: #fff;
  border-radius: 10px;
  box-shadow: -9px 17px 13px rgb(0 0 0 /16%);
`;


const Title = styled.h1``;
