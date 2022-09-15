import { NoteAdd } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { todosSelectors } from "../../../store";
import { TodoList } from "../../../types";
import { NewListModal } from "./new-list-modal";
import { TodoCard } from "./todo-card";

const initialData: TodoList[] = [
    {
        id: 0,
        name: 'First list',
        todos: [
            {
                id: 0,
                name: 'A',
                status: false,
            },
            {
                id: 1,
                name: 'B',
                status: true,
            },
            {
                id: 2,
                name: 'C',
                status: false,
            }
        ],
    },

    {
        id: 1,
        name: 'Second list',
        todos: [
            {
                id: 0,
                name: 'D',
                status: false,
            }
        ],
    },
];

export const TodoCatalog = () => {
    const [newListEdit, setNewListEdit] = useState(false);
    const todoLists = useSelector(todosSelectors.todoLists);

    useEffect(() => {
        localStorage.setItem('todo-lists', JSON.stringify(todoLists));
    }, [todoLists]);

    return (
        <>
            <div className="todo-catalog">
                {todoLists.map(list => {
                    return (<TodoCard list={list} />);
                })}

                <div 
                    className="add-todo-list"
                    onClick={() => {setNewListEdit(true)}}
                >
                    Add new list
                    <NoteAdd fontSize="large"/>
                </div>
            </div>
            {newListEdit && (
                <NewListModal setNewListEdit={setNewListEdit}/>
            )}
        </>
    );
};