import React from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";


function Auth (props) {

    
        return(
            <div className="authBox">
                {(props.action === "login") ? (
                    <Login
                        username={props.username}
                        password={props.password}
                        handleLogin={props.handleLogin}
                        handleInputChange={props.handleInputChange}
                        message={props.message}
                        loggedIn={props.loggedIn}
                        handleLogout={props.handleLogout}
                    />
                ) : (
                    <SignUp
                        username={props.username}
                        password={props.password}
                        confirmPassword={props.confirmPassword}
                        handleSignup={props.handleSignup}
                        handleInputChange={props.handleInputChange}
                        message={props.message}
                    />
                )}
            </div>
        )
    
};

export default Auth;