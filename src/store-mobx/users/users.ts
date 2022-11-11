import { makeAutoObservable } from 'mobx'
import {
  AddTodoListPayload,
  AddTodoPayload,
  AddUserPayload,
  LoginUserPayload,
  MoveTodoPayload,
  RemoveTodoListPayload,
  RemoveTodoPayload,
  SetTodoListNamePayload,
  SetTodoNamePayload,
  ToggleTodoStatusPayload,
} from './types'
import { User } from 'types'

export class UsersStore {
  users: User[] = JSON.parse(localStorage.getItem('users')!) || []
  currentUserEmail: string =
    JSON.parse(localStorage.getItem('current-user-email')!) || ''

  constructor() {
    makeAutoObservable(this)
  }

  addUser(payload: AddUserPayload) {
    this.users.push({ ...payload, lists: [] })
  }

  loginUser(payload: LoginUserPayload) {
    this.currentUserEmail = payload.email
  }

  logoutUser() {
    this.currentUserEmail = ''
  }

  addTodo(payload: AddTodoPayload) {
    const { userEmail, listId, name } = payload
    const userIndex = this.users.findIndex((user) => user.email === userEmail)
    const listIndex = this.users[userIndex].lists.findIndex(
      (list) => list.id === listId
    )
    this.users[userIndex].lists[listIndex].todos.push({
      name,
      status: false,
      id: Math.random().toString(),
    })
    console.log('store was updated')
    console.log(this.users[userIndex].lists[listIndex])
  }

  addTodoList(payload: AddTodoListPayload) {
    const { userEmail, name } = payload
    const userIndex = this.users.findIndex((user) => user.email === userEmail)

    this.users[userIndex].lists.push({
      name,
      todos: [],
      id: Math.random().toString(),
    })
  }

  removeTodo(payload: RemoveTodoPayload) {
    const { userEmail, listId, todoId } = payload
    const userIndex = this.users.findIndex((user) => user.email === userEmail)
    const listIndex = this.users[userIndex].lists.findIndex(
      (list) => list.id === listId
    )
    const todoIndex = this.users[userIndex].lists[listIndex].todos.findIndex(
      (todo) => todo.id === todoId
    )

    this.users[userIndex].lists[listIndex].todos.splice(todoIndex, 1)
  }

  removeTodoList(payload: RemoveTodoListPayload) {
    const { userEmail, listId } = payload
    const userIndex = this.users.findIndex((user) => user.email === userEmail)
    const listIndex = this.users[userIndex].lists.findIndex(
      (list) => list.id === listId
    )

    this.users[userIndex].lists.splice(listIndex, 1)
  }

  setTodoListName(payload: SetTodoListNamePayload) {
    const { userEmail, listId, name } = payload
    const userIndex = this.users.findIndex((user) => user.email === userEmail)
    const listIndex = this.users[userIndex].lists.findIndex(
      (list) => list.id === listId
    )

    this.users[0].lists[listIndex].name = name
  }

  setTodoName(payload: SetTodoNamePayload) {
    const { userEmail, listId, todoId, name } = payload
    const userIndex = this.users.findIndex((user) => user.email === userEmail)
    const listIndex = this.users[userIndex].lists.findIndex(
      (list) => list.id === listId
    )
    const todoIndex = this.users[userIndex].lists[listIndex].todos.findIndex(
      (todo) => todo.id === todoId
    )

    this.users[0].lists[listIndex].todos[todoIndex].name = name
  }

  toggleTodoStatus(payload: ToggleTodoStatusPayload) {
    const { userEmail, listId, todoId } = payload
    const userIndex = this.users.findIndex((user) => user.email === userEmail)
    const listIndex = this.users[userIndex].lists.findIndex(
      (list) => list.id === listId
    )
    const todoIndex = this.users[userIndex].lists[listIndex].todos.findIndex(
      (todo) => todo.id === todoId
    )

    this.users[userIndex].lists[listIndex].todos[todoIndex].status =
      !this.users[userIndex].lists[listIndex].todos[todoIndex].status
  }

  moveTodo(payload: MoveTodoPayload) {
    const {
      userEmail,
      startListId,
      startTodoIndex,
      finishListId,
      finishTodoIndex,
    } = payload
    const userIndex = this.users.findIndex((user) => user.email === userEmail)
    const startListIndex = this.users[userIndex].lists.findIndex(
      (list) => list.id === startListId
    )
    const finishListIndex = this.users[userIndex].lists.findIndex(
      (list) => list.id === finishListId
    )
    const todoToMove =
      this.users[userIndex].lists[startListIndex].todos[startTodoIndex]

    this.users[userIndex].lists[startListIndex].todos.splice(startTodoIndex, 1)
    this.users[userIndex].lists[finishListIndex].todos.splice(
      finishTodoIndex,
      0,
      todoToMove
    )
  }
}

export const usersStore = new UsersStore()
