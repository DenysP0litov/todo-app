export type LoginFormValues = {
    email: string
    password: string
}

export type RegistrationFormValues = LoginFormValues & {
    country: string
    phone: string
    confirmPassword: string
    acceptTerms: boolean
}

export type User = LoginFormValues & {
    phone: string
    country: string
    lists: TodoList[]
}

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
