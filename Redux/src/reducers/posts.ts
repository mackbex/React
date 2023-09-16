export enum PostsActionType {
  FETCH_POSTS = "FETCH_POSTS",
  DELETE_POSTS = "DELETE_POSTS"

}

interface Post {
  useId: number
  id: number
  title: string
}

export interface PostsAction {
  type: PostsActionType
  payload: Post[]
}

const posts = (state: Post[] = [], action: PostsAction) => {
  switch (action.type) {
    case PostsActionType.FETCH_POSTS:
      return [...state, ...action.payload]
    case PostsActionType.DELETE_POSTS:
      state = []
      return state
    default:
      return state
  }
}

export default posts

