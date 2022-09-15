import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { todoActions } from "../../../../../store";

type Props = {
    listId: number,
    setNewTodoEdit: Dispatch<SetStateAction<boolean>>;
};

export const NewTodoModal: React.FC<Props> = ({ listId, setNewTodoEdit}) => {
    const [modalInput, setModalInput] = useState('');
    const dispatch = useDispatch();

    const addNewTodo = (newTodoName: string, listId: number) => {
        dispatch(todoActions.addTodo(newTodoName, listId));
        setNewTodoEdit(false);
    }

    return (
        <Dialog open>
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
                <Button
                    onClick={() => setNewTodoEdit(false)}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => addNewTodo(modalInput, listId)}
                >
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
}