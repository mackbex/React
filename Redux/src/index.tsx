import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {applyMiddleware, createStore} from "redux";
import counter from "./reducers";
import rootReducer from "./reducers";
import {CounterActionType} from "./reducers/counter";
import {TodoActionType} from "./reducers/todos";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
  console.log("store", store);
  console.log("action", action);
  next(action);
}

const middleware = applyMiddleware(loggerMiddleware)
const store = createStore(rootReducer, middleware)

const render = () => root.render(

    <Provider store={store}>
        <App />
    </Provider>
);
render()
store.subscribe(render)
