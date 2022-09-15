import { TodoList } from "../../types";

export type AddTodoList = {
    type: 'ADD_TODO_LIST',
    payload: string,
};

export type AddTodo = {
    type: 'ADD_TODO',
    payload: {
        listId: number,
        name: string,
    }
};

export type RemoveTodoList = {
    type: 'REMOVE_TODO_LIST',
    payload: number,
};

export type RemoveTodo = {
    type: 'REMOVE_TODO',
    payload: { listId: number, todoId: number},
};

export type SetTodoListName = {
    type: 'SET_TODO_LIST_NAME',
    payload: { listId: number, name: string },
}

export type SetTodoName = {
    type: 'SET_TODO_NAME',
    payload: { listId: number, todoId: number, name: string },
}

export type ToggleTodoStatus = {
    type: 'TOGGLE_TODO_STATUS',
    payload: { listId: number, todoId: number },
};

export type TodosAction = (
    AddTodoList
    | AddTodo
    | RemoveTodoList
    | RemoveTodo
    | SetTodoListName
    | SetTodoName
    | ToggleTodoStatus
);

export type TodoListsState = {
    todoLists: TodoList[];
};