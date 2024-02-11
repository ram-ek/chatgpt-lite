import { React, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Signup = () => {
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const nav = useNavigate()

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleRoleChange = (e) => {
        setRole(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePassChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = await fetch('http://localhost:4000/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                role,
                email,
                password
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
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" onChange={handleNameChange} placeholder="Enter name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Role</Form.Label>
          <Form.Control type="text" onChange={handleRoleChange} placeholder="Enter role" />
        </Form.Group>
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
        <Link style={{ textDecoration: "none", color: "#fff" }} to='/login'>Login</Link>
        </Button>
      </Form>
    )
}

export default Signup