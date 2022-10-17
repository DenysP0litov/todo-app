import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import { NoteAdd } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { todosSelectors } from 'store'
import { NewListModal } from './new-list-modal'
import { TodoCard } from './todo-card'
import { MoveTodo } from 'store'

export const TodoCatalog = () => {
  const [newListEdit, setNewListEdit] = useState(false)
  const [drag, setDrag] = useState(false)
  const todoLists = useSelector(todosSelectors.todoLists)
  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.setItem('todo-lists', JSON.stringify(todoLists))
  }, [todoLists])

  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result

    if (!destination) {
      console.log('there is no destination')
    } else {
      console.log('there is destination')
      dispatch(MoveTodo({
        startListId: source.droppableId, 
        startTodoIndex: source.index, 
        finishListId: destination.droppableId, 
        finishTodoIndex: destination.index,
      }))
    }

    setDrag(false)
  }

  const onDragStart = () => {
    setDrag(true)
  }

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="todo-catalog">
        <>
          {todoLists.map((list) => {
            return <TodoCard drag={drag} list={list} />
          })}
        </>

        <div
          className="add-todo-list"
          onClick={() => {
            setNewListEdit(true)
          }}
        >
          Add new list
          <NoteAdd fontSize="large" />
        </div>
      </div>
      {newListEdit && <NewListModal setNewListEdit={setNewListEdit} />}
    </DragDropContext>
  )
}
