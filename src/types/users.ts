export type LoginFormValues = {
    email: string
    password: string
}

export type RegistrationFormValues = LoginFormValues & {
    country: string
    phone: string
    confirmPassword: string
    acceptTerms: boolean
}

export type User = LoginFormValues & {
    phone: string
    country: string
}