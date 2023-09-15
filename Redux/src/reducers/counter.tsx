export enum CounterActionType {
    INCREMENT = "INCREMENT",
    DECREMENT = "DECREMENT"
}


interface CounterAction {
    type: CounterActionType
}

const counter = (state = 0, action: CounterAction) => {
    switch (action.type) {
        case CounterActionType.INCREMENT:
            return state + 1
        case CounterActionType.DECREMENT:
            return state - 1
        default:
            return state
    }
}
export default counter