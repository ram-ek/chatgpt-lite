import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

const Admin = () => {
    const [prompt, setPrompt] = useState('')
    const [resp, setResp] = useState('')

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const { user } = useContext(AuthContext)

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/prompts/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                prompt,
                resp
            })
        })

        const data = await response.json()

        if(response.ok) {
          setPrompt('')
          setResp('')
        }

        setError(data.error)
        setIsLoading(false)
    }
    
    return (
        <form className='prompt-add' onSubmit={ handleSubmit }>
          <label>Prompt:</label>
          <input 
            type='text'
            onChange={ (event) => setPrompt(event.target.value) }
            value={ prompt }
          />

          <label>Response:</label>
          <input 
            type='text'
            onChange={ (event) => setResp(event.target.value) }
            value={ resp }
          />

          <button disabled={ isLoading }>Add</button>
          { error && <div className='error'>{ error }</div> }
        </form>
    )
}

export default Admin