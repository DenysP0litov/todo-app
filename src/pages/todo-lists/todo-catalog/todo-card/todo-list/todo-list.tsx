import { FC } from 'react'
import { Todo } from './todo'
import { TodoList as TodoListType } from 'types'
import { Draggable } from '@hello-pangea/dnd'
import { observer } from 'mobx-react'

type Props = {
  list: TodoListType
}

export const TodoList: FC<Props> = observer(({ list }) => {
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
})
