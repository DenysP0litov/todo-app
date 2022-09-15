export type TodoList = {
    name: string,
    todos: Todo[],
    id: number,
};

export type Todo = {
    id: number,
    name: string,
    status: boolean,
};