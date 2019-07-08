import React, { Component } from "react";
import { Input, FormBtn } from '../Form';
import { Container } from '../Grid'
import { Link } from "react-router-dom";

class SignUp extends Component {
 
    // Begin setting state and assume all inputs are not valid
    state = {
        validUsername: false,
        validPassword: false,
        confirmPassword: false
    }
    // With each update of a value in the form, check to see if they are valid
    componentDidUpdate() {
        this.validatePassword();
        this.confirmPassword();
        this.validateUsername();
        console.log(this.props);
    }
    
    validateUsername() {
        // If the username is more than one character, and the current state of validUsername is false, set it to true
        if(this.props.username.length > 1 && !this.state.validUsername) {
            this.setState({
                validUsername: true
            });
        }
        // If the username is less that 1 and the current state of valid username is true, set it to false.
        if(this.props.username.length < 1 && this.state.validUsername) {
            this.setState({
                validUsername: false
            });
        }
    }
    // Use a regular expression to test the password for strength and set state accordingly
    validatePassword() {
        let strongPassword = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/);
        let valid = strongPassword.test(this.props.password);
        if (!this.state.validPassword && valid) {
            this.setState({
                validPassword: true
            });
        }
        if (this.state.validPassword && !valid) {
            this.setState({
                validPassword: false,
            });
        }
    }

    confirmPassword() {
        if(this.props.password === this.props.confirmPassword && !this.state.confirmPassword  && this.props.password) {
            this.setState({
                confirmPassword: true
            });
        }
        if (this.props.password !== this.props.confirmPassword && this.state.confirmPassword) {
            this.setState({
                confirmPassword: false
            });
        }
    }

    render() {
        return(
            <Container>
                <h2 className="loginTitle title-font">Signup</h2>
                <hr />
                {this.props.message?(
                    <div class="alert alert-primary" role="alert">{this.props.message}</div>
                ) : (<></>)}
                <div id="signup">
                    <div>
                        <label htmlFor="username">Username</label>
                        <Input type="text" name="username" id="username" placeholder="username" value={this.props.username} onChange={this.props.handleInputChange} valid={this.state.validUsername} />
                    </div>
                    <div>
                    <label htmlFor="password">Password</label>
                        <Input type="password" name="password" id="password" placeholder="password" value={this.props.password} onChange={this.props.handleInputChange} valid={this.state.validPassword} />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="confirm password" value={this.props.confirmPassword} onChange={this.props.handleInputChange} valid={this.state.confirmPassword} />
                        <div>at least 8 characters, 1 capital & 1 number</div>
                    </div>
                    <p className="signupLink">
                        <Link to="/login">already have an account?  Sign in here</Link>
                    </p>

                                        {/* if all fields are valid, allow the user to submit the form */}
                                        {(this.state.validUsername && this.state.validPassword && this.state.confirmPassword) ? (
                        <FormBtn onClick={this.props.handleSignup} color="success" >Signup</FormBtn>
                    ) : (
                        <FormBtn onClick={this.props.handleSignup} color="danger"  disabled>Signup</FormBtn>
                    )}
                </div>
            </Container>
        );
    }
}

export default SignUp;