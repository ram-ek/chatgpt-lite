import { useContext } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
    const { user, dispatch } = useContext(AuthContext)

    const handleLogout = () => {
        // remove token
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
    }

    return (
        <header>
            <div className='container'>
                <Link to='/'>
                    <h1>GPT-lite</h1>
                </Link>
                <nav>
                    { user && (
                        <div>
                            <span>{ user.email }</span>
                            <button onClick={ handleLogout }>Log out</button>
                        </div>
                    ) }
                    { !user && (
                        <div>
                            <Link to='/login'>Log in</Link>
                            <Link to='/signup'>Sign up</Link>
                        </div>
                    ) }
                </nav>
            </div>
        </header>
    )
}

export default Navbar