import { Droppable } from '@hello-pangea/dnd'
import { Edit, Delete, AddCircleOutline } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveTodoList, usersSelectors } from 'store'
import { TodoList as TodoListType } from 'types'
import { NewTodoModal } from './new-todo-modal'
import { RenameListModal } from './rename-list-modal'
import { TodoList } from './todo-list'

type Props = {
  list: TodoListType
  drag: boolean
}

export const TodoCard: React.FC<Props> = ({ list, drag }) => {
  const [listNameEdit, setListNameEdit] = useState(false)
  const [newTodoEdit, setNewTodoEdit] = useState(false)
  const dispatch = useDispatch()
  const userEmail = useSelector(usersSelectors.currentUserEmail)

  const removeTodoList = (listId: string) => {
    dispatch(RemoveTodoList({ userEmail, listId }))
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
        
        <Droppable droppableId={list.id}>
          {(provided) => (
            <div 
              ref={provided.innerRef}
              {...provided.droppableProps} 
              className="todo-list__list-container"
            >
              <TodoList list={list}/>
              {drag || (
                <button
                  className="todo-list__add-todo"
                  onClick={() => setNewTodoEdit(true)}
                >
                  <AddCircleOutline />
                  Add new todo
                </button>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
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
