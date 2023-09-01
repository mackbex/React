import React, {Component} from "react";
import styled from "styled-components";

export default class App extends Component {

    state = {
        todoData: [
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
        ],
      value: ""
    }

    removeTodo = (id: Number) => {
        this.setState({todoData: this.state.todoData.filter((data) => data.id !== id)});
    }

    handleKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({value: e.target.value})
    }

    handleCheck = (id: Number) => {

      let newTodoData = this.state.todoData.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed
        }
        return data
      });

      this.setState({todoData : newTodoData})

      console.log("array", this.state.todoData)
    }

    handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      let newTodoData = {
        id: Date.now(),
        title: this.state.value,
        completed: false
      }
      this.setState({
        todoData: [...this.state.todoData, newTodoData],
        value: ""
      })
    }

    render() {
        return (
            <Container>
                <TodoBlock>
                    <Title>Todo List</Title>

                    <TodoForm onSubmit={this.handleSubmit}>
                        <TodoInput
                            type="text"
                            name="value"
                            placeholder="input todo"
                            value={this.state.value}
                            onChange={this.handleKeyword}
                        />
                      <TodoSubmit
                        type={"submit"}
                        value={"Input"}

                      />
                    </TodoForm>

                    {this.state.todoData.map(data => (
                        <ListItem key={data.id} completed={data.completed}>
                            <label>
                              <input type="checkbox" defaultChecked={data.completed} onChange={() => this.handleCheck(data.id)}/>
                              {data.title}
                            </label>
                            <RemoveTodo onClick={() => this.removeTodo(data.id)}>x</RemoveTodo>
                        </ListItem>
                    ))}
                </TodoBlock>
            </Container>
        )
    }
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

const ListItem = styled.div<{completed: boolean}>`
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