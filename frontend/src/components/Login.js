import { React, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const nav = useNavigate()

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePassChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })

        const data = await result.json()

        if(result.ok) {
            if(data.role == "user")
                nav('/user')
            else if(data.role == "admin")
                nav('/admin')
        }
    }
    
    return (
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" onChange={handleEmailChange} placeholder="Enter email" />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={handlePassChange} placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="primary" type="submit">
            <Link style={{ textDecoration: "none", color: "#fff" }} to='/signup'>Signup</Link>
        </Button>
      </Form>
    )
}

export default Login