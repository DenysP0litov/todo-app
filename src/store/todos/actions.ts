import { AddTodo, AddTodoList, RemoveTodo, RemoveTodoList, SetTodoListName, SetTodoName, ToggleTodoStatus } from "./types";

export const todoActions = {
    removeTodoList: (listId: number): RemoveTodoList => ({
        type: 'REMOVE_TODO_LIST',
        payload: listId,
    }),

    removeTodo: (listId: number, todoId: number): RemoveTodo => ({
        type: 'REMOVE_TODO',
        payload: {
            listId,
            todoId,
        }
    }),

    addTodoList: (newTodoListName: string): AddTodoList => ({
        type: 'ADD_TODO_LIST',
        payload: newTodoListName,
    }),

    addTodo: (newTodoName: string, listId: number): AddTodo => ({
        type: 'ADD_TODO',
        payload: {
            listId,
            name: newTodoName,
        },
    }),

    setTodoListName: (newTodoListName: string, listId: number): SetTodoListName => ({
        type: 'SET_TODO_LIST_NAME',
        payload: {
            listId,
            name: newTodoListName,
        },
    }),

    setTodoName: (listId: number, todoId: number, newTodoName: string): SetTodoName => ({
        type: 'SET_TODO_NAME',
        payload: {
            listId,
            todoId,
            name: newTodoName,
        },
    }),

    toggleTodoStatus: (listId: number, todoId: number): ToggleTodoStatus => ({
        type: 'TOGGLE_TODO_STATUS',
        payload: {
            listId,
            todoId,
        },
    }),
}