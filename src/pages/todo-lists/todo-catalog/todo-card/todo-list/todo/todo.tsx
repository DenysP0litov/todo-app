import { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Todo as TodoType } from 'types'
import { TodoListItem } from './todo-list-item'
import { EditTodoModal } from './edit-todo-modal'

type Props = {
  todo: TodoType
  index: number
  listId: number
}

export const Todo: React.FC<Props> = ({ todo, listId, index }) => {
  const [todoEdit, setTodoEdit] = useState(false)

  return (
    <>
      <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided) => (
          <TodoListItem 
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            listId={listId} 
            todo={todo}
            setTodoEdit={setTodoEdit}
          />
        )}
      </Draggable>

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
}
