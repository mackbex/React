import React, {useEffect, useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {AppThunkDispatch, RootState} from "./reducers";
import {TodoActionType} from "./reducers/todos";
import {CounterActionType} from "./reducers/counter";
import fetchPosts from "./actions/posts";

type Props = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

function App() {
  const dispatch = useDispatch<AppThunkDispatch>()
  const counter = useSelector((state: RootState) => state.counter)
  const todos = useSelector((state: RootState) => state.todos)
  const posts = useSelector((state: RootState) => state.posts)

  const [todoValue, setTodoValue] = useState("")

  useEffect(() => {
  dispatch(fetchPosts())
  }, [dispatch]);

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

      <ul>
        {posts.map((post, index) => <li key={index}>{post.title}</li>)}
      </ul>
    </div>
  );
}

export default App;
