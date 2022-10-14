export type TodoList = {
  name: string
  todos: Todo[]
  id: string
}

export type Todo = {
  id: string
  name: string
  status: boolean
}
