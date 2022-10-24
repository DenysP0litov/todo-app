import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { AddTodo, usersSelectors } from 'store'

type Props = {
  listId: string
  setNewTodoEdit: Dispatch<SetStateAction<boolean>>
}

export const NewTodoModal: React.FC<Props> = ({ listId, setNewTodoEdit }) => {
  const [modalInput, setModalInput] = useState('')
  const dispatch = useDispatch()
  const userEmail = useSelector(usersSelectors.currentUserEmail)

  const addNewTodo = (name: string, listId: string) => {
    dispatch(AddTodo({ userEmail, name, listId }))
    setNewTodoEdit(false)
  }

  const keyHandler = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        addNewTodo(modalInput, listId)
        setNewTodoEdit(false)
        break
      case 'Escape':
        setNewTodoEdit(false)
        break
      default:
    }
  }

  return (
    <Dialog open onKeyUp={(event) => keyHandler(event)}>
      <DialogTitle>Adding new todo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter name for new todo to continue
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="New todo name"
          fullWidth
          variant="standard"
          value={modalInput}
          onChange={(event) => setModalInput(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setNewTodoEdit(false)}>Cancel</Button>
        <Button onClick={() => addNewTodo(modalInput, listId)}>Add</Button>
      </DialogActions>
    </Dialog>
  )
}
