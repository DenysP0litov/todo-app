import { FC, JSXElementConstructor, ReactElement } from 'react'
import { Todo } from './todo'
import { TodoList as TodoListType } from 'types/todos'
import { Draggable, DroppableProvided } from 'react-beautiful-dnd'

type Props = {
  list: TodoListType
  innerRef: (element: HTMLElement | null) => any
  provided: DroppableProvided
  children:
    | ReactElement<HTMLElement, string | JSXElementConstructor<any>>
    | null
    | undefined
}

export const TodoList: FC<Props> = ({ list, innerRef, provided }) => {
  return (
    <ul 
      className="todo-list__todos"
      ref={innerRef}
      {...provided.droppableProps}
    >
      {list.todos?.map((todo, index) => {
        return (
          <Draggable draggableId={todo.id} index={index}>
            {(provided) => (
              <Todo
                provided={provided}
                listId={list.id}
                todo={todo}
                innerRef={provided.innerRef}
              />
            )}
          </Draggable>
        )
      })}
    </ul>
  )
}
