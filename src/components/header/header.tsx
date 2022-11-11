import { useNavigate } from "react-router-dom"
import { UsersStore } from "store-mobx"

const usersStore = new UsersStore()

export const Header: React.FC = () => {
    const navigate = useNavigate()

    const logout = () => {
        usersStore.LogoutUser()
        localStorage.setItem(
            'current-user-email',
            JSON.stringify(''),
        )
        navigate('/login')
    }

    return (
        <header className="header">
            <h1 className="header__title">TodoApp</h1>
            <button className="header__button"
            onClick={logout}>
                Logout
            </button>
        </header>
    )
}