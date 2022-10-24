import { RootState } from '../types'

export const usersSelectors = {
  users: (state: RootState) => state.users.users,
  currentUser: (state: RootState) => state.users.currentUser,
}


