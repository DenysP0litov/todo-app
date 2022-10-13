import { Delete, Edit } from "@mui/icons-material"
import { Checkbox, IconButton } from "@mui/material"
import { FC } from "react"
import { useDispatch } from "react-redux"
import { ToggleTodoStatus, RemoveTodo } from "store"
import { Todo } from "types"

type Props = {
    todo: Todo
    listId: number
    setTodoEdit: (value: boolean) => void
    innerRef: (element: HTMLElement | null) => any
}

export const TodoListItem: FC<Props> = ({ todo, listId, setTodoEdit }) => {
    const dispatch = useDispatch()

    const toggleTodoStatus = (listId: number, todoId: number) => {
        dispatch(ToggleTodoStatus({ listId, todoId }))
    }

    const removeTodo = (listId: number, todoId: number) => {
        dispatch(RemoveTodo({ listId, todoId }))
    }
    
    return (
        <li key={todo.id} className="todo-list__todo-item">
            <div className="todo-list__item-info">
              <Checkbox
                checked={todo.status}
                onChange={() => toggleTodoStatus(listId, todo.id)}
              />
              {todo.name}
            </div>
    
            <div className="todo-list__todo-buttons">
              <IconButton onClick={() => setTodoEdit(true)}>
                <Edit className="todo-list__todo-button" fontSize="small" />
              </IconButton>
    
              <IconButton onClick={() => removeTodo(listId, todo.id)}>
                <Delete className="todo-list__todo-button" fontSize="small" />
              </IconButton>
            </div>
        </li>
    )
}