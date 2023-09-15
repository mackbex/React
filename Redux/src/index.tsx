import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createStore} from "redux";
import counter from "./reducers";
import rootReducer from "./reducers";
import {CounterActionType} from "./reducers/counter";
import {TodoActionType} from "./reducers/todos";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = createStore(rootReducer)

const render = () => root.render(

    <Provider store={store}>
        <App />
    </Provider>
);
render()
store.subscribe(render)
