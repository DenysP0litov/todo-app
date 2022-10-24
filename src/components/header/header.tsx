import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { LogoutUser } from "store/users"

export const Header: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
        dispatch(LogoutUser())
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