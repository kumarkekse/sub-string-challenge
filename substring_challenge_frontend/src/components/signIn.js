import React, { useState } from "react"
import axios from 'axios';
import { message, Form, Input, Button, Typography } from 'antd';
import { Link } from "react-router-dom"

const layout = {
  labelCol: { offset: 4, span: 4 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

export default function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { history } = props

  //submit the form data
  const handleSubmit = async (event) => {
    event.preventDefault()
    await axios.post(`${process.env.REACT_APP_API_URL}/users/sign_in`, {
      email,
      password
    })
      .then(function (response) {
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token)
          history.push('/new')
        }
      })
      .catch(function (error) {
        console.log(error);
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
        <Typography.Title {...tailLayout} level={2}>Sign In</Typography.Title>
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

      <Form.Item {...tailLayout}>
        <Button type="primary" onClick={handleSubmit} htmlType="submit">Sign In</Button>
        <Link to="/sign_up" className="btn btn-link">Sign Up</Link>
      </Form.Item>
    </Form>
  )
}
