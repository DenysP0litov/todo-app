import { Edit, Delete, AddCircleOutline } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { RemoveTodoList } from 'store'
import { TodoList } from 'types'
import { NewTodoModal } from './new-todo-modal'
import { RenameListModal } from './rename-list-modal'
import { Todo } from './todo'

type Props = {
  list: TodoList
}

export const TodoCard: React.FC<Props> = ({ list }) => {
  const [listNameEdit, setListNameEdit] = useState(false)
  const [newTodoEdit, setNewTodoEdit] = useState(false)
  const dispatch = useDispatch()

  const removeTodoList = (listId: number) => {
    dispatch(RemoveTodoList({ listId }))
  }

  return (
    <>
      <div key={list.id} className="todo-list">
        <div className="todo-list__panel">
          <p className="todo-list__title">{list.name}</p>
          <div className="todo-list__panel-buttons">
            <IconButton onClick={() => setListNameEdit(true)}>
              <Edit className="todo-list__panel-button" />
            </IconButton>
            <IconButton onClick={() => removeTodoList(list.id)}>
              <Delete className="todo-list__panel-button" />
            </IconButton>
          </div>
        </div>

        <ul className="todo-list__todos">
          {list.todos?.map((todo) => {
            return <Todo listId={list.id} todo={todo} />
          })}
          <button
            className="todo-list__add-todo"
            onClick={() => setNewTodoEdit(true)}
          >
            <AddCircleOutline />
            Add new todo
          </button>
        </ul>
      </div>
      {listNameEdit && (
        <RenameListModal
          listName={list.name}
          listId={list.id}
          setListNameEdit={setListNameEdit}
        />
      )}
      {newTodoEdit && (
        <NewTodoModal listId={list.id} setNewTodoEdit={setNewTodoEdit} />
      )}
    </>
  )
}
