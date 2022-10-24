export type TodoList = {
  name: string
  userEmail: string
  todos: Todo[]
  id: string
}

export type Todo = {
  id: string
  name: string
  status: boolean
}
