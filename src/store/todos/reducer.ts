import { TodoListsState, TodosAction } from "./types";

const initialState: TodoListsState = {
    todoLists: JSON.parse(
        localStorage.getItem('todo-lists')!,
    ) || [],
};

export const todosReducer = (state: TodoListsState = initialState, action: TodosAction) => {
    switch(action.type) {
        case ('ADD_TODO_LIST'):
            return {
                ...state,
                todoLists: [
                    ...state.todoLists,
                    {
                        name: action.payload,
                        id: Math.random(),
                        todos: [],
                    }
                ]
            };
        case ('ADD_TODO'):
            return {
                ...state,
                todoLists: state.todoLists.map(list => {
                    if (list.id !== action.payload.listId) {
                        return list;
                    } 

                    return {
                        ...list,
                        todos: [
                            ...list.todos,
                            {
                                id: Math.random(),
                                name: action.payload.name,
                                status: false,
                            }
                        ]
                    };
                }),
            };
        case ('REMOVE_TODO_LIST'):
            return {
                ...state,
                todoLists: state.todoLists.filter(list => list.id !== action.payload),
            };
        case ('REMOVE_TODO'):
            return {
                ...state,
                todoLists: state.todoLists.map(list => {
                    if (list.id !== action.payload.listId) {
                        return list;
                    };

                    return {
                        ...list,
                        todos: list.todos.filter(todo => todo.id !== action.payload.todoId)
                    };
                }),
            };
        case ('SET_TODO_LIST_NAME'):
            return {
                ...state,
                todoLists: state.todoLists.map(list => {
                    if (list.id !== action.payload.listId) {
                        return list;
                    };

                    return {
                        ...list,
                        name: action.payload.name,
                    };
                }),
            };
        case ('SET_TODO_NAME'):
            return {
                ...state,
                todoLists: state.todoLists.map(list => {
                    if (list.id !== action.payload.listId) {
                        return list;
                    };

                    return {
                        ...list,
                        todos: list.todos.map(todo => {
                            if (todo.id !== action.payload.todoId) {
                                return todo;
                            };

                            return {
                                ...todo,
                                name: action.payload.name,
                            };
                        })
                    };
                }),
            };
        case ('TOGGLE_TODO_STATUS'):
            return {
                ...state,
                todoLists: state.todoLists.map(list => {
                    if (list.id !== action.payload.listId) {
                        return list;
                    };

                    return {
                        ...list,
                        todos: list.todos.map(todo => {
                            if (todo.id !== action.payload.todoId) {
                                return todo;
                            };

                            return {
                                ...todo,
                                status: !todo.status,
                            };
                        })
                    };
                }),
            };
        default:
            return state;
    }
};