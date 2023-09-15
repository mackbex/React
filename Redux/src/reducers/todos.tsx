export enum TodoActionType {
    ADD_TODO = "ADD_TODO",
    DELETE_TODO = "DELETE_TODO"
}

interface TodoAction {
    type: TodoActionType
    text: string
}

const todos = (state: string[] = [], action: TodoAction) => {
    switch (action.type) {
        case TodoActionType.ADD_TODO:
            return [...state, action.text]
        default:
            return state
    }
}
export default todos