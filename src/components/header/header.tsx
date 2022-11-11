import { useNavigate } from "react-router-dom"
import { usersStore } from "store-mobx"

export const Header: React.FC = () => {
    const navigate = useNavigate()

    const logout = () => {
        usersStore.logoutUser()
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