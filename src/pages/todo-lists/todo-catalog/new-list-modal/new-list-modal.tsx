import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AddTodoListThunk } from 'store'

type Props = {
  setNewListEdit: Dispatch<SetStateAction<boolean>>
}

export const NewListModal: React.FC<Props> = ({ setNewListEdit }) => {
  const dispatch = useDispatch()
  const [modalInput, setModalInput] = useState('')

  const addNewList = (newListName: string) => {
    dispatch(AddTodoListThunk(newListName))
    setNewListEdit(false)
  }

  const keyHandler = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        addNewList(modalInput)
        setNewListEdit(false)
        break
      case 'Escape':
        setNewListEdit(false)
        break
      default:
    }
  }

  return (
    <Dialog open onKeyUp={(event) => keyHandler(event)}>
      <DialogTitle>Adding new list</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter name for new list to continue
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="New list name"
          fullWidth
          variant="standard"
          value={modalInput}
          onChange={(event) => setModalInput(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setNewListEdit(false)}>Cancel</Button>
        <Button onClick={() => addNewList(modalInput)}>Add</Button>
      </DialogActions>
    </Dialog>
  )
}
