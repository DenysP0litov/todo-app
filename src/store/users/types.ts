import { User } from "types"

export type AddUserPayload = {
  email: string
  phone: string
  password: string
  country: string
}

export type LoginUserPayload = {
  email: string
}

export type LogoutUserPayload = {}

export type UsersState = {
  users: User[]
  currentUser: User | undefined
}