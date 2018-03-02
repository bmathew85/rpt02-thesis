import React, { Component } from 'react'
import axios from 'axios'
import { Button, Checkbox, Form } from 'semantic-ui-react'



class SignupForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
    	name: '',
    	email: '',
    	username: '',
    	password: '',
    	password2:''
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
    const { name, email, username, password } = this.state
    axios
    	.post('/users/register', {
    		name,
    		email,
        username,
        password
    	})
    	.then((response)=> {
    		console.log(response)
    	})
    	.catch((err)=> {
    		console.log(err)
    	})
    this.setState({ name: '', email: '', username: '', password: '', password2:'' })
  }

  // fetchUser () {
  //   .get('/')
  // }


	render(){
		const { name, email, username, password, password2 } = this.state

		return(

		<div className="ui text container">
				<Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input placeholder='Name' name='name' value={name} onChange={this.handleChange} />
            <Form.Input placeholder='Email' name='email' value={email} onChange={this.handleChange} />
            <Form.Input placeholder='Username' name='username' value={username} onChange={this.handleChange} />
            <Form.Input placeholder='Password' name='password' value={password} onChange={this.handleChange} />
            <Form.Input placeholder='Confirm Password' name='password2' value={password2} onChange={this.handleChange} />

            <Form.Button content='Submit' />
          </Form.Group>
        </Form>

		</div>
		)
	}
};

export default SignupForm;

// <form className="ui form">
// 				<div className="field">
// 					<label>User Name</label>
// 					<input placeholder="User Name" />
// 				</div>
// 				<div className="field">
// 					<label>First Name</label>
// 					<input onChange={this.handleChange} placeholder="First Name" />
// 				</div>
// 				<div className="field">
// 					<label>Last Name</label>
// 					<input onChange={this.handleChange}  placeholder="Last Name" />
// 				</div>
// 				<div className="field">
// 					<label>Email</label>
// 					<div className="ui input">
// 						<input onChange={this.handleChange}  type="text" placeholder="Email" />
// 					</div>
// 				</div>
// 				<div className="field">
// 					<label>Password</label>
// 					<div className="ui input">
// 						<input onChange={this.handleChange}  type="text" placeholder="Enter Your Password" />
// 					</div>
// 				</div>
// 				<div className="field">
// 					<label>Verify Password</label>
// 					<div className="ui input">
// 						<input onChange={this.handleChange}  type="text" placeholder="Re-Enter Your Password" />
// 					</div>
// 				</div>
// 				<button type="submit" className="ui button" role="button">
// 					Sign Up Now
// 				</button>
// 			</form>
