import { Edit, Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { todoActions } from "../../../../../store";
import { Todo as TodoType } from "../../../../../types";
import { EditTodoModal } from "./edit-todo-modal";

type Props = {
    todo: TodoType;
    listId: number;
}

export const Todo: React.FC<Props> = ({todo, listId}) => {
    const [todoEdit, setTodoEdit] = useState(false);
    const dispatch = useDispatch();

    const toggleTodoStatus = (listId: number, todoId: number) => {
        dispatch(todoActions.toggleTodoStatus(listId, todoId));
    }

    const removeTodo = (listId: number, todoId: number) => {
        dispatch(todoActions.removeTodo(listId, todoId));
    } 

    return (
        <>
            <li key={todo.id} className="todo-list__todo-item">
                <div className="todo-list__item-info">
                    <Checkbox 
                        checked={todo.status}
                        onChange={() => toggleTodoStatus(listId, todo.id)}
                    />
                    {todo.name}
                </div>

                <div className="todo-list__todo-buttons">
                    <IconButton
                        onClick={() => setTodoEdit(true)}
                    >
                        <Edit className="todo-list__todo-button" fontSize="small"/>
                    </IconButton>

                    <IconButton
                        onClick={() => removeTodo(listId, todo.id)}
                    >
                        <Delete className="todo-list__todo-button" fontSize="small"/>
                    </IconButton>
                </div>
            </li>

            {todoEdit && <EditTodoModal
                todoName={todo.name}
                listId={listId}
                todoId={todo.id}
                setTodoEdit={setTodoEdit}
            />}
        </>
    );
}