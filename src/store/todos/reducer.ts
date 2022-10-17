import {
  AddTodoListPayload,
  AddTodoPayload,
  MoveTodoPayload,
  RemoveTodoListPayload,
  RemoveTodoPayload,
  SetTodoListNamePayload,
  SetTodoNamePayload,
  TodoListsState,
  ToggleTodoStatusPayload,
} from './types'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: TodoListsState = {
  todoLists: JSON.parse(localStorage.getItem('todo-lists')!) || [],
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    AddTodo: (state, action: PayloadAction<AddTodoPayload>) => {
      const { listId, name } = action.payload
      const listIndex = state.todoLists.findIndex((list) => list.id === listId)
      state.todoLists[listIndex].todos.push({
        name,
        status: false,
        id: Math.random().toString(),
      })
    },
    AddTodoList: (state, action: PayloadAction<AddTodoListPayload>) => {
      const { name } = action.payload
      state.todoLists.push({
        name,
        todos: [],
        id: Math.random().toString(),
      })
    },
    RemoveTodo: (state, action: PayloadAction<RemoveTodoPayload>) => {
      const { listId, todoId } = action.payload
      const listIndex = state.todoLists.findIndex((list) => list.id === listId)
      const todoIndex = state.todoLists[listIndex].todos.findIndex(
        (todo) => todo.id === todoId
      )

      state.todoLists[listIndex].todos.splice(todoIndex, 1)
    },
    RemoveTodoList: (state, action: PayloadAction<RemoveTodoListPayload>) => {
      const { listId } = action.payload
      const listIndex = state.todoLists.findIndex((list) => list.id === listId)

      state.todoLists.splice(listIndex, 1)
    },
    SetTodoListName: (state, action: PayloadAction<SetTodoListNamePayload>) => {
      const { listId, name } = action.payload
      const listIndex = state.todoLists.findIndex((list) => list.id === listId)

      state.todoLists[listIndex].name = name
    },
    SetTodoName: (state, action: PayloadAction<SetTodoNamePayload>) => {
      const { listId, todoId, name } = action.payload
      const listIndex = state.todoLists.findIndex((list) => list.id === listId)
      const todoIndex = state.todoLists[listIndex].todos.findIndex(
        (todo) => todo.id === todoId
      )

      state.todoLists[listIndex].todos[todoIndex].name = name
    },
    ToggleTodoStatus: (
      state,
      action: PayloadAction<ToggleTodoStatusPayload>
    ) => {
      const { listId, todoId } = action.payload
      const listIndex = state.todoLists.findIndex((list) => list.id === listId)
      const todoIndex = state.todoLists[listIndex].todos.findIndex(
        (todo) => todo.id === todoId
      )

      state.todoLists[listIndex].todos[todoIndex].status =
        !state.todoLists[listIndex].todos[todoIndex].status
    },
    MoveTodo: (
      state,
      action: PayloadAction<MoveTodoPayload>
    ) => {
      const { startListId, startTodoIndex, finishListId, finishTodoIndex} = action.payload
      const startListIndex = state.todoLists.findIndex((list) => list.id === startListId)
      const finishListIndex = state.todoLists.findIndex((list) => list.id === finishListId)
      const todoToMove = state.todoLists[startListIndex].todos[startTodoIndex]

      state.todoLists[startListIndex].todos.splice(startTodoIndex, 1)
      state.todoLists[finishListIndex].todos.splice(finishTodoIndex, 0, todoToMove)
    },
  },
})

export const {
  AddTodo,
  AddTodoList,
  RemoveTodoList,
  RemoveTodo,
  SetTodoName,
  SetTodoListName,
  ToggleTodoStatus,
  MoveTodo,
} = todosSlice.actions

export default todosSlice.reducer
