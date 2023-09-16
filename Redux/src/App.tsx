import React, {useState} from 'react';
import './App.css';
import {useDispatch, useSelector, useStore} from "react-redux";
import {RootState} from "./reducers";
import {TodoActionType} from "./reducers/todos";
import {CounterActionType} from "./reducers/counter";

type Props = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

function App() {
  const dispatch = useDispatch()
  const counter = useSelector((state: RootState) => state.counter)
  const todos = useSelector((state: RootState) => state.todos)

  const [todoValue, setTodoValue] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value)
  }

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!todoValue) return;

    dispatch({ type: TodoActionType.ADD_TODO, text: todoValue})

    setTodoValue("")
  }

  const onIncrement = () => {
    dispatch({type: CounterActionType.INCREMENT})
  }

  const onDecrement = () => {
    dispatch({type: CounterActionType.DECREMENT})
  }

  return (
    <div className={"App"}>
      Clicked: {counter} times
      {' '}
      <button onClick={onIncrement}>+</button>
      {' '}
      <button onClick={onDecrement}>-</button>

      <ul>
        {todos.map((todo, index) => <li key={index}>{todo}</li>)}
      </ul>
      <form onSubmit={addTodo}>
        <input type={"text"} value={todoValue} onChange={handleChange}/>
        <input type={"submit"} />
      </form>
    </div>
  );
}

export default App;
