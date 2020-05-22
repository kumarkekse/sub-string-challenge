import React, { Component } from "react"
import { Link } from 'react-router-dom'
import axios from  'axios';
import _ from 'lodash'
import { message } from 'antd';

class SingUp extends Component {
   constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      err:{}
    }
  }

  //set the input change value
  handleChange=(event) =>{
    this.setState({ [event.target.name]: event.target.value })
  }
  
  //submit the form data
  handleSubmit=async(event)=> {
    event.preventDefault()
    const err = {}
    const {email , password } = this.state
    const {history} = this.props
    if (password === '' ) {
      err.password = 'Enter password.'
    }
    if (email === '' || email.trim() === '') {
      err.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      err.email = 'Invalid email';
    }
    this.setState({ err })
    if (!Object.keys(err).length) {
        await axios.post('https://sub-string-matcher.herokuapp.com/users/sign_in', {
           email: email.toLowerCase(),
           password:password
         })
         .then(function (response) {
           if(response.status === 200){
             localStorage.setItem('token',_.get(response,'data.token',null))
             history.push('/create_string_matches')
           }
         })
         .catch(function (error) {
           console.log(error);
           message.error('Something went wrong.')
        });
    }
  }

  render() {
    const {err , email , password } = this.state
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Sign In</h2>
        <form  name="form" onSubmit={this.handleSubmit}>
        <div className={'form-group'}>
            <label htmlFor="userName">Email</label>
            <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange.bind(this)} />
            { err && err.email ?
             <div className="help-block">{err.email}</div> : ''
             }    

        </div>
        <div className={'form-group'}>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" value={password}  onChange={this.handleChange.bind(this)} />
            {err && err.password ?
             <div className="help-block">{err.password}</div> : '' 
            }   
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-primary">Sign In</button>
            <Link to="/sign_up" className="btn btn-link">Sign Up</Link>
        </div>                     
        </form>
      </div>
     )
  }
}

export default SingUp
