import { action, makeAutoObservable, makeObservable, observable } from "mobx"
import { AddTodoListPayload, AddTodoPayload, AddUserPayload, LoginUserPayload, MoveTodoPayload, RemoveTodoListPayload, RemoveTodoPayload, SetTodoListNamePayload, SetTodoNamePayload, ToggleTodoStatusPayload } from "store"
import { User } from "types"

export class UsersStore {
  users: User[] = JSON.parse(localStorage.getItem('users')!)
  currentUserEmail: string = JSON.parse(localStorage.getItem('current-user-email')!)

  constructor() {
    // makeObservable(this, {
    //   users: observable,
    //   currentUserEmail: observable,
    //   AddUser: action,
    //   LoginUser: action,
    //   LogoutUser: action,
    //   AddTodo: action,
    //   AddTodoList: action,
    //   RemoveTodo: action,
    //   RemoveTodoList: action,
    //   SetTodoListName: action,
    //   SetTodoName: action,
    //   ToggleTodoStatus: action,
    //   MoveTodo: action,
    // })
    makeAutoObservable(this)
  }

  AddUser(payload: AddUserPayload) {
    this.users.push({...payload, lists: []})
  }

  LoginUser(payload: LoginUserPayload) {
    this.currentUserEmail = payload.email
  }

  LogoutUser() {
    this.currentUserEmail = ''
  }

  AddTodo(payload: AddTodoPayload) {
    const { userEmail, listId, name } = payload
    const userIndex = this.users.findIndex(user => user.email === userEmail)
    const listIndex = this.users[userIndex].lists.findIndex(list => list.id === listId)
    this.users[userIndex].lists[listIndex].todos.push({
      name,
      status: false,
      id: Math.random().toString(),
    })
    console.log('store was updated')
    console.log(this.users[userIndex].lists[listIndex])
  }

  AddTodoList(payload: AddTodoListPayload) {
    const { userEmail, name } = payload
    const userIndex = this.users.findIndex(user => user.email === userEmail)

    this.users[userIndex].lists.push({
      name,
      todos: [],
      id: Math.random().toString()
    })
  }

  RemoveTodo(payload: RemoveTodoPayload) {
    const { userEmail, listId, todoId } = payload
    const userIndex = this.users.findIndex(user => user.email === userEmail)
    const listIndex = this.users[userIndex].lists.findIndex((list) => list.id === listId)
    const todoIndex = this.users[userIndex].lists[listIndex].todos.findIndex(
      (todo) => todo.id === todoId
    )

    this.users[userIndex].lists[listIndex].todos.splice(todoIndex, 1)
  }

  RemoveTodoList(payload: RemoveTodoListPayload) {
    const { userEmail, listId } = payload
    const userIndex = this.users.findIndex(user => user.email === userEmail)
    const listIndex = this.users[userIndex].lists.findIndex((list) => list.id === listId)

    this.users[userIndex].lists.splice(listIndex, 1)
  }

  SetTodoListName(payload: SetTodoListNamePayload) {
    const { userEmail, listId, name } = payload
    const userIndex = this.users.findIndex(user => user.email === userEmail)
    const listIndex = this.users[userIndex].lists.findIndex((list) => list.id === listId)

    this.users[0].lists[listIndex].name = name
  }

  SetTodoName(payload: SetTodoNamePayload) {
    const { userEmail, listId, todoId, name } = payload
    const userIndex = this.users.findIndex(user => user.email === userEmail)
    const listIndex = this.users[userIndex].lists.findIndex((list) => list.id === listId)
    const todoIndex = this.users[userIndex].lists[listIndex].todos.findIndex(
      (todo) => todo.id === todoId
    )

    this.users[0].lists[listIndex].todos[todoIndex].name = name
  }

  ToggleTodoStatus(payload: ToggleTodoStatusPayload) {
    const { userEmail, listId, todoId } = payload
    const userIndex = this.users.findIndex(user => user.email === userEmail)
    const listIndex = this.users[userIndex].lists.findIndex((list) => list.id === listId)
    const todoIndex = this.users[userIndex].lists[listIndex].todos.findIndex(
      (todo) => todo.id === todoId
    )

    this.users[userIndex].lists[listIndex].todos[todoIndex].status =
      !this.users[userIndex].lists[listIndex].todos[todoIndex].status

    console.log(this.users[userIndex].lists[listIndex].todos[todoIndex].status)
  }

  MoveTodo(payload: MoveTodoPayload) {
    const { userEmail, startListId, startTodoIndex, finishListId, finishTodoIndex} = payload
    const userIndex = this.users.findIndex(user => user.email === userEmail)
    const startListIndex = this.users[userIndex].lists.findIndex((list) => list.id === startListId)
    const finishListIndex = this.users[userIndex].lists.findIndex((list) => list.id === finishListId)
    const todoToMove = this.users[userIndex].lists[startListIndex].todos[startTodoIndex]

    this.users[userIndex].lists[startListIndex].todos.splice(startTodoIndex, 1)
    this.users[userIndex].lists[finishListIndex].todos.splice(finishTodoIndex, 0, todoToMove)
  }
}