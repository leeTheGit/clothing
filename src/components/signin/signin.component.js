import React from 'react'
import FormInput from '../form-input/form-input.components'
import Button from '../custom-button/custom-button.component'

class Signin extends React.Component
 {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }


    handleSubmit = e => {
        e.preventDefault();
        this.setState({email:'', password: ''});
    }


    handleChange = e => {
        const {value, name} = e.target;
        this.setState({ [name]: value});
    }


    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>

                    <FormInput 
                        name="email" 
                        type="email" 
                        handleChange={this.handleChange} 
                        value={this.state.email} 
                        label="Email"
                        required />
                    
                    <FormInput 
                        name="password" 
                        type="password" 
                        handleChange={this.handleChange} 
                        value={this.state.password} 
                        label="Password"
                        required />

                    <Button type="submit">Sign In</Button>
                </form>
            </div>
        )
    }    

}


export default Signin;