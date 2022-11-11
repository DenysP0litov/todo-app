import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'
import { observer } from 'mobx-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { UsersStore } from 'store-mobx'

const usersStore = new UsersStore()

type Props = {
  listName: string
  listId: string
  setListNameEdit: Dispatch<SetStateAction<boolean>>
}

export const RenameListModal: React.FC<Props> = observer(({
  listName,
  listId,
  setListNameEdit,
}) => {
  const [modalInput, setModalInput] = useState(listName)
  const userEmail = usersStore.currentUserEmail

  const renameList = (newListName: string, listId: string) => {
    usersStore.SetTodoListName({ userEmail, listId, name: newListName })
    setListNameEdit(false)
  }

  const keyHandler = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        renameList(modalInput, listId)
        setListNameEdit(false)
        break
      case 'Escape':
        setListNameEdit(false)
        break
      default:
    }
  }

  return (
    <Dialog open onKeyUp={(event) => keyHandler(event)}>
      <DialogTitle>Renaming list</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter new list name to continue</DialogContentText>
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
        <Button onClick={() => setListNameEdit(false)}>Cancel</Button>
        <Button onClick={() => renameList(modalInput, listId)}>Rename</Button>
      </DialogActions>
    </Dialog>
  )
})
