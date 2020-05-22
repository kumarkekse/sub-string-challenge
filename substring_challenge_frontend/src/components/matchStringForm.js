import React, { useState } from "react"
import axios from 'axios';
import { message, Form, Input, Button, Typography } from 'antd';

const layout = {
  labelCol: { offset: 4, span: 4 },
  wrapperCol: { span: 8 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

export default function MatchStringForm() {
  const [first_string, setFirstString] = useState('');
  const [second_string, setSecondString] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault()

    const token = localStorage.getItem('token')
    let config = {
      headers: {
        Authorization: token,
      }
    }
    await axios.post(`${process.env.REACT_APP_API_URL}/string_matches`, {
      "first_string": first_string,
      "second_string": second_string
    }, config)
      .then(function (response) {
        const { result } = response.data
        if (result) {
          message.success('Substring Matched!')
        }
        if (!result) {
          message.success('Substring does not Match.')
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
        <Typography.Title {...tailLayout} level={2}>Match String</Typography.Title>
      </Form.Item>
      <Form.Item
        label="First String"
        name="first_string"
        rules={[{ required: true, message: 'Please input first string!' }]}
      >
        <Input 
          name="first_string"
          type="text"
          value={first_string}
          onChange={(e) => setFirstString(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="second string"
        name="second_string"
        rules={[{ required: true, message: 'Please input second string!' }]}
      >
        <Input
          name="second_string"
          value={second_string}
          onChange={(e) => setSecondString(e.target.value)}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" onClick={handleSubmit} htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  )
}
