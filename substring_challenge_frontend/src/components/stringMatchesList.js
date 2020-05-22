import React, { Component } from "react"
import axios from  'axios';
import _ from 'lodash'
import { DeleteFilled  , ExclamationCircleOutlined} from '@ant-design/icons';
import { Modal } from 'antd';
import './css/stringList.css'

const { confirm } = Modal;

class StringMatchesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matchedStringArray :[]
    }
  }

  componentDidMount = async() =>{
    try{
      const token = localStorage.getItem('token')
      let config = {
        headers: {
          Authorization: token,
        }
      }
      const response = await axios.get('https://sub-string-matcher.herokuapp.com/string_matches',config)
      this.setState({matchedStringArray:_.get(response,'data',[])})
    }catch(error){
      console.log(error)
    }
  }

  
  //Delete the substring 
  handleDeleteConfirm=(data)=> {
    const token = localStorage.getItem('token')
    let config = {
      headers: {
        Authorization: token,
      }
    }
    confirm({
      title: 'Are you sure delete this string match?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk:async()=> {
        try{
          const response = await axios.delete(`https://sub-string-matcher.herokuapp.com/string_matches/${data.id}`,config)
          if(response){
            const response = await axios.get('https://sub-string-matcher.herokuapp.com/string_matches',config)
            this.setState({matchedStringArray:_.get(response,'data',[])})
          }
        }catch(error){
          console.log(error)
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    const {matchedStringArray} = this.state
    const showStringMatchesData = matchedStringArray.length > 0 && matchedStringArray.map((data , i)=>{
      return(
      <tr key = {i}>
        <td className='paddingLeft'>{_.get(data,'first_string' , '')}</td>
        <td className='paddingLeft'>{_.get(data,'second_string' , '')}</td>
        <td className='paddingLeft'>{(_.get(data,'result' , false)).toString()}</td>
        <td className='paddingLeft'><DeleteFilled onClick={()=>this.handleDeleteConfirm(data)}/></td>
      </tr>
      )
    })
    return(
      <div className="col-md-6 col-md-offset-3">
        <h2>List of submatched string </h2>
        <table>
          <thead>
            <tr>
              <th className='paddingLeft'>{'First String'}</th>
              <th className='paddingLeft'>{'Second String'}</th>
              <th className='paddingLeft'>{'Result'}</th>
              <th className='paddingLeft'>{'Delete'}</th>
            </tr>
          </thead>
          <tbody>
            {showStringMatchesData}
          </tbody>
		    </table>
      </div>
    )
  }
}

export default StringMatchesList
