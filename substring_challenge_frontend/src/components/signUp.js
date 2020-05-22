import React, { Component } from "react"
import { Link } from 'react-router-dom'
import axios from  'axios';
import { message } from 'antd';

class SingUp extends Component {
   constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      password_confirmation:'',
      err:{}
    }
  }

  handleChange=(event) =>{
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit=async(event)=> {
    event.preventDefault()
    const err = {}
    const {email , password , password_confirmation} = this.state
    const {history} = this.props
    if (password === '' ) {
      err.password = 'Enter password.'
    }
    if (password_confirmation === '') {
      err.password_confirmation = 'Enter confirm password.'
    }
    if (password_confirmation && password && password_confirmation !== password) {
      err.password_confirmation = 'Password and confirm password should be same.'
    }
    if (email === '' || email.trim() === '') {
      err.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      err.email = 'Invalid email';
    }
    this.setState({ err })
    if (!Object.keys(err).length) {
     await axios.post('https://sub-string-matcher.herokuapp.com/users', {
        email: email.toLowerCase(),
        password:password,
        password_confirmation:password_confirmation
      })
      .then(function (response) {
        if(response.status === 200){
          history.push('/sign_in')
        }
      })
      .catch(function (error) {
        message.error('Something went wrong.')
      });
    }
  }

  render() {
    const {err , email , password , password_confirmation} = this.state
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Sign Up</h2>
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
        <div className={'form-group'}>
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input type="password" className="form-control" name="password_confirmation" value={password_confirmation}  onChange={this.handleChange.bind(this)} />
            {err && err.password_confirmation ?
             <div className="help-block">{err.password_confirmation}</div> : '' 
            }   
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-primary">SingUp</button>
            <Link to="/sign_in" className="btn btn-link">Cancel</Link>
        </div>                     
        </form>
      </div>
     )
  }
}

export default SingUp
