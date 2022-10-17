import { FC, ReactNode } from 'react'
import { Todo } from './todo'
import { TodoList as TodoListType } from 'types/todos'
import { Draggable, DroppableProvided } from '@hello-pangea/dnd'

type Props = {
  list: TodoListType
  // innerRef: (element: HTMLElement | null) => any
  // provided: DroppableProvided
  // children: ReactNode
}

export const TodoList: FC<Props> = ({ list }) => {
  return (
    <ul
      className="todo-list__todos"
    >
      {list.todos?.map((todo, index) => {
        return (
          <Draggable draggableId={todo.id} index={index} key={todo.id}>
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
