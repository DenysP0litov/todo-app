import {
  AddTodoPayload,
  MoveTodoPayload,
  RemoveTodoListPayload,
  RemoveTodoPayload,
  SetTodoListNamePayload,
  SetTodoNamePayload,
  TodoListsState,
  ToggleTodoStatusPayload,
} from './types'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store/types';

const initialState: TodoListsState = {
  todoLists: JSON.parse(localStorage.getItem('todo-lists')!) || [],
}

export const AddTodoListThunk = createAsyncThunk(
  "AddTodoListThunk",
  async (name: string, { getState }) => {
    const state: RootState = getState()
    return {
      name,
      userEmail: state!.users!.currentUser!.email,
      todos: [],
      id: Math.random().toString(),
    }
  }
);

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
    // AddTodoList: (state, action: PayloadAction<AddTodoListPayload>) => {
    //   const { name } = action.payload
    //   // if (user) {
    //   //   state.todoLists.push({
    //   //     name,
    //   //     userEmail: user.email,
    //   //     todos: [],
    //   //     id: Math.random().toString(),
    //   //   })
    //   // }
    // },
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
    extraReducers: (builder) => {
      builder.addCase(AddTodoListThunk.pending, (state, action) => {
        console.log('im workin')
        state.todos.todoLists.push(action.payload)
      });
    }
  },
})

export const {
  AddTodo,
  RemoveTodoList,
  RemoveTodo,
  SetTodoName,
  SetTodoListName,
  ToggleTodoStatus,
  MoveTodo,
} = todosSlice.actions

export default todosSlice.reducer
