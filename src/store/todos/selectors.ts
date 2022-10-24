import { RootState } from '../types'

export const todosSelectors = {
  todoLists: (state: RootState) => state.todos.todoLists,
}


