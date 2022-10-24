import { configureStore } from '@reduxjs/toolkit'
import { todosSlice } from './todos'
import { usersSlice } from './users'

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    users: usersSlice.reducer,
  },
})
