import React, { useState } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios';
import { message, Form, Input, Typography, Button } from 'antd';

const layout = {
  labelCol: { offset: 4, span: 4 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

export default function SignUp(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { history } = props

  //submit the form data
  const handleSubmit = async (event) => {
    event.preventDefault()
    
    const headers = {
      'Content-Type': 'application/json'
    }
    await axios.post(`${process.env.REACT_APP_API_URL}/users`, {
      email: email.toLowerCase(),
      password: password,
      password_confirmation: passwordConfirmation
    }, { headers })
      .then(function (response) {
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token)
          history.push('/new')
        }
      })
      .catch(function (error) {
        message.error('Something went wrong.')
      });
  }

  return (
    <Form
      {...layout}
      name="basic"
      submit={handleSubmit}
    >
    <Form.Item {...tailLayout}>
      <Typography.Title {...tailLayout} level={2}>Sign Up</Typography.Title>
    </Form.Item>
    <Form.Item
      label="email"
      name="email"
      
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input 
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password 
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </Form.Item>

    <Form.Item
      label="Password Confirmation"
      name="passwordConfirmation"
      rules={[{ required: true, message: 'Please input your password confirmation!' }]}
    >
      <Input.Password 
        name="passwordConfirmation"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
    </Form.Item>

    <Form.Item {...tailLayout}>
      <Button type="primary" onClick={handleSubmit} htmlType="submit">Sign Up</Button>
      <Link to="/sign_in" className="btn btn-link">Sign In</Link>
    </Form.Item>
  </Form>
  )
}
