import {AnyAction, combineReducers} from "redux";
import counter from "./counter";
import todos from "./todos";
import posts from "./posts";
import {ThunkDispatch} from "redux-thunk";

const rootReducer = combineReducers({
    counter,
    todos,
    posts
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>