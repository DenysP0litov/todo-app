import { useState } from 'react'
import { Todo as TodoType } from 'types'
import { EditTodoModal } from './edit-todo-modal'
import { Checkbox, IconButton } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { DraggableProvided } from '@hello-pangea/dnd'
import { usersStore } from 'store-mobx'
import { observer } from 'mobx-react'

type Props = {
  todo: TodoType
  listId: string
  innerRef: (element: HTMLElement | null) => any
  provided: DraggableProvided
}

export const Todo: React.FC<Props> = observer(({ todo, listId, innerRef, provided }) => {
  const [todoEdit, setTodoEdit] = useState(false)
  const userEmail = usersStore.currentUserEmail

  const toggleTodoStatus = (listId: string, todoId: string) => {
      usersStore.toggleTodoStatus({ userEmail, listId, todoId })
  }

  const removeTodo = (listId: string, todoId: string) => {
      usersStore.removeTodo({ userEmail, listId, todoId })
  }

  return (
    <>
      <li 
        ref={innerRef} 
        key={todo.id} 
        className="todo-list__todo-item"
        {...provided.dragHandleProps}
        {...provided.draggableProps}
      >
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

      {todoEdit && (
        <EditTodoModal
          todoName={todo.name}
          listId={listId}
          todoId={todo.id}
          setTodoEdit={setTodoEdit}
        />
      )}
    </>
  )
})
