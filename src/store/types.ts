import { TodoListsState } from './todos'
import { UsersState } from './users'

export type RootState = {
  todos: TodoListsState
  users: UsersState
}
