import React, { Component } from "react"
import axios from  'axios';
import _ from 'lodash';
import 'antd/dist/antd.css';
import { message , Button} from 'antd';
import { Link } from 'react-router-dom'

class CreateStringMatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_string:'',
      second_string:'',
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
    const {first_string , second_string} = this.state
    if (first_string === '' ) {
      err.first_string = 'Enter first string.'
    }
    if (second_string === '') {
      err.second_string = 'Email second string';
    } 
    this.setState({ err })
    if (!Object.keys(err).length) {
      const token = localStorage.getItem('token')
      let config = {
        headers: {
          Authorization: token,
        }
      }
      await axios.post('https://sub-string-matcher.herokuapp.com/string_matches', {
        "first_string": first_string,
        "second_string":second_string
        },config)
        .then(function (response) {
          const result = _.get(response,'data.result',false)
          if(result){
            message.success('Stringa matched and created successfully.')
          }
          if(!result){
          message.success('strings not matched.')
          }
        })
        .catch(function (error) {
          console.log(error);
          message.error('Something went wrong.')
      });
    }
  }
  
  //handle the signout 
  handleSignOut(){
    const {history} = this.props
    localStorage.clear('token')
    history.push('/sign_in')
  }

  render() {
    const {err , first_string , second_string } = this.state
    return (
      <div className="col-md-6 col-md-offset-3">
         <h2>Click on below button and view your all string</h2>
		      <form  name="form">
		        <div className="form-group">
               <Link to="/string_matches_list"><Button  className="btn btn-primary">View</Button></Link>
		        </div>
            <div className="form-group">
              <Button  className="btn btn-primary" onClick={()=>this.handleSignOut()}>Sign Out</Button>
		        </div>
		      </form>
        <h2>Create String</h2>
        <form  name="form" onSubmit={this.handleSubmit}>
        <div className={'form-group'}>
            <label htmlFor="first_string">First string</label>
            <input type="text" className="form-control" name="first_string" value={first_string} onChange={this.handleChange.bind(this)} />
            { err && err.first_string ?
             <div className="help-block">{err.first_string}</div> : ''
             }    

        </div>
        <div className={'form-group'}>
            <label htmlFor="second_string">Second string</label>
            <input type="second_string" className="form-control" name="second_string" value={second_string}  onChange={this.handleChange.bind(this)} />
            {err && err.second_string ?
             <div className="help-block">{err.second_string}</div> : '' 
            }   
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>                     
        </form>
      </div>
     )
  }
}

export default CreateStringMatches
