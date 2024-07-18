import { useContext, useState } from 'react'

import { AuthContext } from '../context/AuthContext'

const Signup = () => {
    const { dispatch } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                role,
                password
            })
        })

        const data = await response.json()

        if(response.ok) {
            // add token to localstorage
            localStorage.setItem('user', JSON.stringify(data))

            // dispatch auth context
            dispatch({ type: 'LOGIN', payload: data })
        }

        setIsLoading(false)
        setError(data.error)
    }
  
    return (
        <form className='signup' onSubmit={ handleSubmit }>
            <h3>Signup</h3>
            <label>Email:</label>
            <input
                type='email'
                onChange={ (event) => setEmail(event.target.value) }
                value={ email }
            />
            <label>Role:</label>
            <input
                type='text'
                onChange={ (event) => setRole(event.target.value) }
                value={ role }
            />

            <label>Password:</label>
            <input
                type='password'
                onChange={ (event) => setPassword(event.target.value) }
                value={ password }
            />

            <button disabled={ isLoading }>Sign up</button>
            { error && <div className='error'>{ error }</div> }
        </form>
    )
}

export default Signup