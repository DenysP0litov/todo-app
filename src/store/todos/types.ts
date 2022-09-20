import { TodoList } from '../../types'

export type AddTodoListPayload = {
  name: string
}

export type AddTodoPayload = {
  listId: number
  name: string
}

export type RemoveTodoListPayload = {
  listId: number
}

export type RemoveTodoPayload = {
  listId: number
  todoId: number
}

export type SetTodoListNamePayload = {
  listId: number
  name: string
}

export type SetTodoNamePayload = {
  listId: number
  todoId: number
  name: string
}

export type ToggleTodoStatusPayload = {
  listId: number
  todoId: number
}

export type TodoListsState = {
  todoLists: TodoList[]
}
