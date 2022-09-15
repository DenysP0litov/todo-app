import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { todoActions } from "../../../../../store";

type Props = {
    listId: number,
    setListNameEdit: Dispatch<SetStateAction<boolean>>;
};

export const RenameListModal: React.FC<Props> = ({listId, setListNameEdit}) => {
    const [modalInput, setModalInput] = useState('');
    const dispatch = useDispatch();

    const renameList = (newListName: string, listId: number) => {
        dispatch(todoActions.setTodoListName(newListName, listId));
        setListNameEdit(false);
    }

    return (
        <Dialog open>
            <DialogTitle>Renaming list</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter new list name to continue
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
                <Button
                    onClick={() => setListNameEdit(false)}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => renameList(modalInput, listId)}
                >
                    Rename
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
