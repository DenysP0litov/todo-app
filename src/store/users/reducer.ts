import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AddTodoListPayload, AddTodoPayload, AddUserPayload, LoginUserPayload, MoveTodoPayload, RemoveTodoListPayload, RemoveTodoPayload, SetTodoListNamePayload, SetTodoNamePayload, ToggleTodoStatusPayload, UsersState } from "./types"

export const initialState: UsersState = {
  users: JSON.parse(localStorage.getItem('users')!) || [],
  currentUserEmail: JSON.parse(localStorage.getItem('current-user-email')!) || '',
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    AddUser: (state, action: PayloadAction<AddUserPayload>) => {
      state.users.push({...action.payload, lists: []})
    },
    LoginUser: (state, action: PayloadAction<LoginUserPayload>) => {
      state.currentUserEmail = action.payload.email
    },
    LogoutUser: (state) => {
      state.currentUserEmail = ''
    },
    AddTodo: (state, action: PayloadAction<AddTodoPayload>) => {
      const { userEmail, listId, name } = action.payload
      const userIndex = state.users.findIndex(user => user.email === userEmail)
      const listIndex = state.users[userIndex].lists.findIndex(list => list.id === listId)
      state.users[userIndex].lists[listIndex].todos.push({
        name,
        status: false,
        id: Math.random().toString(),
      })
    },
    AddTodoList: (state, action: PayloadAction<AddTodoListPayload>) => {
      const { userEmail, name } = action.payload
      const userIndex = state.users.findIndex(user => user.email === userEmail)

      state.users[userIndex].lists.push({
        name,
        todos: [],
        id: Math.random().toString()
      })
    },
    RemoveTodo: (state, action: PayloadAction<RemoveTodoPayload>) => {
      const { userEmail, listId, todoId } = action.payload
      const userIndex = state.users.findIndex(user => user.email === userEmail)
      const listIndex = state.users[userIndex].lists.findIndex((list) => list.id === listId)
      const todoIndex = state.users[userIndex].lists[listIndex].todos.findIndex(
        (todo) => todo.id === todoId
      )

      state.users[userIndex].lists[listIndex].todos.splice(todoIndex, 1)
    },
    RemoveTodoList: (state, action: PayloadAction<RemoveTodoListPayload>) => {
      const { userEmail, listId } = action.payload
      const userIndex = state.users.findIndex(user => user.email === userEmail)
      const listIndex = state.users[userIndex].lists.findIndex((list) => list.id === listId)

      state.users[userIndex].lists.splice(listIndex, 1)
    },
    SetTodoListName: (state, action: PayloadAction<SetTodoListNamePayload>) => {
      const { userEmail, listId, name } = action.payload
      const userIndex = state.users.findIndex(user => user.email === userEmail)
      const listIndex = state.users[userIndex].lists.findIndex((list) => list.id === listId)

      state.users[0].lists[listIndex].name = name
    },
    SetTodoName: (state, action: PayloadAction<SetTodoNamePayload>) => {
      const { userEmail, listId, todoId, name } = action.payload
      const userIndex = state.users.findIndex(user => user.email === userEmail)
      const listIndex = state.users[userIndex].lists.findIndex((list) => list.id === listId)
      const todoIndex = state.users[userIndex].lists[listIndex].todos.findIndex(
        (todo) => todo.id === todoId
      )

      state.users[0].lists[listIndex].todos[todoIndex].name = name
    },
    ToggleTodoStatus: (
      state,
      action: PayloadAction<ToggleTodoStatusPayload>
    ) => {
      const { userEmail, listId, todoId } = action.payload
      const userIndex = state.users.findIndex(user => user.email === userEmail)
      const listIndex = state.users[userIndex].lists.findIndex((list) => list.id === listId)
      const todoIndex = state.users[userIndex].lists[listIndex].todos.findIndex(
        (todo) => todo.id === todoId
      )

      state.users[userIndex].lists[listIndex].todos[todoIndex].status =
        !state.users[userIndex].lists[listIndex].todos[todoIndex].status
    },
    MoveTodo: (
      state,
      action: PayloadAction<MoveTodoPayload>
    ) => {
      const { userEmail, startListId, startTodoIndex, finishListId, finishTodoIndex} = action.payload
      const userIndex = state.users.findIndex(user => user.email === userEmail)
      const startListIndex = state.users[userIndex].lists.findIndex((list) => list.id === startListId)
      const finishListIndex = state.users[userIndex].lists.findIndex((list) => list.id === finishListId)
      const todoToMove = state.users[userIndex].lists[startListIndex].todos[startTodoIndex]

      state.users[userIndex].lists[startListIndex].todos.splice(startTodoIndex, 1)
      state.users[userIndex].lists[finishListIndex].todos.splice(finishTodoIndex, 0, todoToMove)
    },
  }
})

export const {
  AddUser,
  LoginUser,
  LogoutUser,
  AddTodoList,
  AddTodo,
  RemoveTodoList,
  RemoveTodo,
  SetTodoName,
  SetTodoListName,
  ToggleTodoStatus,
  MoveTodo,
} = usersSlice.actions

export default usersSlice.reducer