import { TodoList } from '../../types'

export type AddTodoListPayload = {
  name: string
}

export type AddTodoPayload = {
  listId: string
  name: string
}

export type RemoveTodoListPayload = {
  listId: string
}

export type RemoveTodoPayload = {
  listId: string
  todoId: string
}

export type SetTodoListNamePayload = {
  listId: string
  name: string
}

export type SetTodoNamePayload = {
  listId: string
  todoId: string
  name: string
}

export type ToggleTodoStatusPayload = {
  listId: string
  todoId: string
}

export type MoveTodoPayload = {
  startListId: string
  startTodoIndex: number
  finishListId: string
  finishTodoIndex: number
}

export type TodoListsState = {
  todoLists: TodoList[]
}
