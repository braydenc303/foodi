import React from "react";
import { Input, FormBtn } from '../Form';
import { Container} from '../Grid'
import { Link } from "react-router-dom";


function Login(props) {


    return (
        <Container>
            <div className="loginBox">
                <h2 className="loginTitle title-font">Login</h2>
                <hr/>
                {props.message ? (
                    <div class="alert alert-primary" role="alert">Please Sign In</div>
                ) : (<></>)}

                {props.loggedIn ? (
                    <FormBtn id="logOutBtn" onClick={props.handleLogout} >Logout</FormBtn>
                ) : (
                <>
                <div id="login">
                    <div>
                        <div htmlFor="username">Username</div>
                        <Input type="text" name="username" id="username" placeholder="username" value={props.username} onChange={props.handleInputChange} />
                    </div>
                    <div>
                        <div htmlFor="password">Password</div>
                        <Input type="password" name="password" id="password" placeholder="password" value={props.password} onChange={props.handleInputChange} />
                    </div>
                    <div> 
                        <p className="signupLink">
                            <Link to="/signup">Don't have an account? Sign up here.</Link>
                        </p>
                    </div>
                </div>
                <FormBtn id="loginBtn" onClick={props.handleLogin} >Login</FormBtn>
                </>
                )}
            </div>
        </Container>
    );
}

export default Login;