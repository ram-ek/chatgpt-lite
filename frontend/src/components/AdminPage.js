import { React, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AdminPage = () => {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value)
    }

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = await fetch('http://localhost:4000/api/admin/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "question": question,
                "answer": answer
            })
        })

        // const data = await result.json()

        document.getElementById("question").value = ''
        document.getElementById("answer").value = ''
    }
    
    return (
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Question</Form.Label>
          <Form.Control type="text" id='question' onChange={handleQuestionChange} placeholder="Question" />
        </Form.Group>
  
        <Form.Group className="mb-3" >
          <Form.Label>Answer</Form.Label>
          <Form.Control type="text" id='answer' onChange={handleAnswerChange} placeholder="Answer" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
}

export default AdminPage