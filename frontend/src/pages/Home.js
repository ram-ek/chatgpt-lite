import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import MessageCard from '../components/MessageCard'

const Home = () => {
    const [prompt, setPrompt] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [prompts, setPrompts] = useState([])

    const { user } = useContext(AuthContext)

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('hello')
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/prompts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ prompt })
        })

        const data = await response.json()
        
        if(response.ok) {
            setPrompts([ ...prompts, data ])
            setPrompt('')
            console.log(prompts)
        }

        setIsLoading(false)
        setError(data.error)
    }

    return (
        <div className='home'>
            <div className='chat-screen'>
                <div className='chat-window'>
                    { prompts.map((p) => (
                        <MessageCard key={p._id} msg={p} />
                    )) }
                </div>
                <div className='prompt-input'>
                    <form className='chat' onSubmit={ handleSubmit }>
                        <input 
                            type='input'
                            placeholder='Enter your prompt here'
                            onChange={ (event) => setPrompt(event.target.value) }
                            value={ prompt }
                        />
                        <button disabled={ isLoading }>Send</button>
                        { error && <div className='error'>{ error }</div> }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home