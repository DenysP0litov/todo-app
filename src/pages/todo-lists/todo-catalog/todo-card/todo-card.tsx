import { Edit, Delete, AddCircleOutline } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { RemoveTodoList } from 'store'
import { TodoList as TodoListType } from 'types'
import { NewTodoModal } from './new-todo-modal'
import { RenameListModal } from './rename-list-modal'
import { TodoList } from './todo-list'

type Props = {
  list: TodoListType
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
        
        <div className="todo-list__list-container">
          <Droppable droppableId={list.id.toString()}>
            {(provided) => (
              <TodoList 
                {...provided.droppableProps}
                innerRef={provided.innerRef}
                list={list}
              >
                {provided.placeholder}
              </TodoList>
            )}
          </Droppable>
          <button
              className="todo-list__add-todo"
              onClick={() => setNewTodoEdit(true)}
          >
              <AddCircleOutline />
              Add new todo
          </button>
        </div>
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
