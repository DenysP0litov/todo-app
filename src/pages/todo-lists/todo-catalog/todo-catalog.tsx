import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import { NoteAdd } from '@mui/icons-material'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { UsersStore } from 'store-mobx'
import { NewListModal } from './new-list-modal'
import { TodoCard } from './todo-card'

const usersStore = new UsersStore()

export const TodoCatalog = observer(() => {
  const [newListEdit, setNewListEdit] = useState(false)
  const [drag, setDrag] = useState(false)
  const userEmail = usersStore.currentUserEmail
  const users = usersStore.users
  const todoLists = usersStore.users.find(
    user => user.email === userEmail
  )?.lists || []

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result

    if (!destination) {
      console.log('there is no destination')
    } else {
      console.log('there is destination')
      usersStore.MoveTodo({
        userEmail,
        startListId: source.droppableId, 
        startTodoIndex: source.index, 
        finishListId: destination.droppableId, 
        finishTodoIndex: destination.index,
      })
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
            return <TodoCard drag={drag} list={list} key={list.id}/>
          })}
        </>

        <div
          className="add-todo-list"
          // onClick={() => {
          //   setNewListEdit(true)
          // }}
          onClick={() => console.log(userEmail)}
        >
          Add new list
          <NoteAdd fontSize="large" />
        </div>
      </div>
      {newListEdit && <NewListModal setNewListEdit={setNewListEdit} />}
    </DragDropContext>
  )
})
