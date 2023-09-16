import {PostsAction, PostsActionType} from "../reducers/posts";
import {RootState} from "../reducers";
import axios from "axios";
import {ThunkAction} from "redux-thunk";

type PostThunkResult<R> = ThunkAction<R, RootState, null, PostsAction>
const fetchPosts = (): PostThunkResult<Promise<void>> => async dispatch => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
  dispatch({type: PostsActionType.FETCH_POSTS, payload: response.data})
}

export default fetchPosts