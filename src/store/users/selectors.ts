import { RootState } from '../types'

export const usersSelectors = {
  users: (state: RootState) => state.users.users,
  currentUserEmail: (state: RootState) => state.users.currentUserEmail,
}


