import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { todoActions } from "../../../../store";

type Props = {
    setNewListEdit: Dispatch<SetStateAction<boolean>>;
};

export const NewListModal: React.FC<Props> = ({setNewListEdit}) => {
    const dispatch = useDispatch();
    const [modalInput, setModalInput] = useState('');

    const addNewList = (newListName: string) => {
        dispatch(todoActions.addTodoList(newListName));
        setNewListEdit(false);
    }

    return (
        <Dialog open>
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
                <Button
                    onClick={() => setNewListEdit(false)}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => addNewList(modalInput)}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}