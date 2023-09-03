import React, {useState} from "react";
import styled from "styled-components";
import ListItem from "./components/ListItem";



export interface PropsTodoData {
    id: number,
    title: string,
    completed: boolean
}

export default function App() {

    const [todoData, setTodoData] = useState<PropsTodoData[]>([
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
        setTodoData(todoData.filter((data) => data.id !== id))
    }

    const handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleCheck = (id: Number) => {
        let newTodoData = todoData.map((data) => {
            if (data.id === id) {
                data.completed = !data.completed
            }
            return data
        });

        setTodoData(newTodoData)
        console.log("array", todoData)
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!title) return;

        let newTodoData = {
            id: Date.now(),
            title: title,
            completed: false
        }
        setTodoData(prev =>
            [...prev, newTodoData]
        );
        setTitle("")
    }

    return (
        <Container>
            <TodoBlock>
                <Title>Todo List</Title>

                <TodoForm onSubmit={handleSubmit}>
                    <TodoInput
                        type="text"
                        name="value"
                        placeholder="input todo"
                        value={title}
                        onChange={handleKeyword}
                    />
                    <TodoSubmit
                        type={"submit"}
                        value={"Input"}
                    />
                </TodoForm>

                {todoData.map(data => (
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

const TodoInput = styled.input`
  padding: 5px;
`;

const TodoSubmit = styled.input``;

const TodoForm = styled.form`
  display: flex;

  ${TodoInput} {
    flex: 10;
  }

  ${TodoSubmit} {
    flex: 1;
  }
`;

const Title = styled.h1``;
