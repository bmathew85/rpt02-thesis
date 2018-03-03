import React, { Component } from 'react'
import axios from 'axios'
import { Button, Checkbox, Form } from 'semantic-ui-react'



class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.state = {


    	username: '',
    	password: ''

    }
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
	}

  handleChange (e, { name, value }) {
   this.setState({
     [name]: value
   })
 	}

  handleSubmit () {
    const { username, password } = this.state
    axios
    	.post('/users/login', {
    		username,
    		password
    	})
    	.then((response)=> {
    		console.log(response)
    	})
    	.catch((err)=> {
    		console.log(err)
    	})
    this.setState({ username: '', password: '' })
  }



	render(){
		const { username, password } = this.state

		return(

		<div className="ui text container">
				<Form onSubmit={this.handleSubmit}>
          <Form.Group>

            <Form.Input placeholder='Username' name='username' value={username} onChange={this.handleChange} />
            <Form.Input placeholder='Password' name='password' value={password} onChange={this.handleChange} />
            <Form.Button content='Submit' />
          </Form.Group>
        </Form>

		</div>
		)
	}
};

export default LoginForm;
