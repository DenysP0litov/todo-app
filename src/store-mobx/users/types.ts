export type AddUserPayload = {
  email: string
  phone: string
  password: string
  country: string
}

export type LoginUserPayload = {
  email: string
}

export type LogoutUserPayload = {}

export type AddTodoListPayload = {
  userEmail: string
  name: string
}

export type AddTodoPayload = {
  userEmail: string
  listId: string
  name: string
}

export type RemoveTodoListPayload = {
  userEmail: string
  listId: string
}

export type RemoveTodoPayload = {
  userEmail: string
  listId: string
  todoId: string
}

export type SetTodoListNamePayload = {
  userEmail: string
  listId: string
  name: string
}

export type SetTodoNamePayload = {
  userEmail: string
  listId: string
  todoId: string
  name: string
}

export type ToggleTodoStatusPayload = {
  userEmail: string
  listId: string
  todoId: string
}

export type MoveTodoPayload = {
  userEmail: string
  startListId: string
  startTodoIndex: number
  finishListId: string
  finishTodoIndex: number
}