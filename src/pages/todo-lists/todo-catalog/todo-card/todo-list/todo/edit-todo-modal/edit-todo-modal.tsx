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
import { SetTodoName, usersSelectors } from 'store'

type Props = {
  todoName: string
  listId: string
  todoId: string
  setTodoEdit: Dispatch<SetStateAction<boolean>>
}

export const EditTodoModal: React.FC<Props> = ({
  todoName,
  listId,
  todoId,
  setTodoEdit,
}) => {
  const [modalInput, setModalInput] = useState(todoName)
  const dispatch = useDispatch()
  const userEmail = useSelector(usersSelectors.currentUserEmail)

  const renameTodo = (listId: string, todoId: string, name: string) => {
    dispatch(SetTodoName({ userEmail, listId, todoId, name }))
    setTodoEdit(false)
  }

  const keyHandler = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        renameTodo(listId, todoId, modalInput)
        setTodoEdit(false)
        break
      case 'Escape':
        setTodoEdit(false)
        break
      default:
    }
  }

  return (
    <Dialog open onKeyUp={(event) => keyHandler(event)}>
      <DialogTitle>Renaming todo</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter new todo name to continue</DialogContentText>
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
        <Button onClick={() => setTodoEdit(false)}>Cancel</Button>
        <Button onClick={() => renameTodo(listId, todoId, modalInput)}>
          Rename
        </Button>
      </DialogActions>
    </Dialog>
  )
}
