import { FC, JSXElementConstructor, ReactElement } from 'react'
import { Todo } from './todo'
import { TodoList as TodoListType } from 'types/todos'

type Props = {
    list: TodoListType
    innerRef: (element: HTMLElement | null) => any
    children: ReactElement<HTMLElement, string | JSXElementConstructor<any>> | null | undefined
}

export const TodoList: FC<Props> = ({ list }) => {
    return (
      <ul className="todo-list__todos">
        {list.todos?.map((todo, index) => {
          return <Todo listId={list.id} todo={todo} index={index}/>
        })}
      </ul>
    )
}