import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AddUserPayload, LoginUserPayload, UsersState } from "./types"

export const initialState: UsersState = {
  users: JSON.parse(localStorage.getItem('users')!) || [],
  currentUser: JSON.parse(localStorage.getItem('current-user')!) || undefined,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    AddUser: (state, action: PayloadAction<AddUserPayload>) => {
      state.users.push({...action.payload})
    },
    LoginUser: (state, action: PayloadAction<LoginUserPayload>) => {
      state.currentUser = state.users.find(
        user => user.email === action.payload.email
      ) || undefined
    },
    LogoutUser: (state) => {
      state.currentUser = undefined
    },
  }
})

export const {
  AddUser,
  LoginUser,
  LogoutUser,
} = usersSlice.actions

export default usersSlice.reducer