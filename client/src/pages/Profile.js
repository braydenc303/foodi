import React, {Component} from "react";
import { Link } from "react-router-dom"
import API from "../utils/API"


class Profile extends Component {
    state = {
        loggedIn: false,
        user: null,
        loading: true,
    }

    componentDidMount() {

        this.loading();

        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                this.setState({
                    loggedIn: true,
                    user: user.data.user
                }, () =>{
                    API.getUserFnbs(this.state.user._id).then(
                        res => this.setState({
                            user: res.data
                        })
                        ).catch(err => console.log(err));
                        API.getUserEntries(this.state.user._id).then(
                            res => this.setState({
                                user: res.data
                            })
                        )
                });
            }
        }).catch(err => {
            console.log(err);
        });

        // console.log(this.props)
    }

    loading() {
        setTimeout(()=> {
            this.setState({
                loading: false
            })
        }, 1000)  
    }

    render() {
        return (
            <div className="profilePage">
                {this.state.loggedIn ? (
                    <div className="profileBox">
                        <h1 id="userTitle">Welcome {this.state.user.username}</h1>
                        
                        <h2>Tasting Notes</h2>
                        { this.state.user.fnbArray.map(fnb => {
                            console.log(fnb)
                            return (
                                    <a key = {fnb._id} href={`users/userFnbs/${fnb._id}`}>
                                        <h3>{fnb.name}</h3>
                                    </a>
                                );
                                })}

                        <h2>Diary Entries</h2>
                        { this.state.user.entryArray.map(entry => {
                            return (
                                    <a key = {entry._id} href={`users/userEntries/${entry._id}`}>
                                        <h3>{entry.name}</h3>
                                    </a>
                                );
                                })}
                    
                    </div>
                ) : (
                    <div className="noUser">
                        {!this.state.loading ? (
                            <>
                                <h1>PLEASE LOG IN</h1>
                                <Link className="loginLink" to="/login"><button className="loginBtn" color="info" >Login</button></Link>
                            </>
                        ) : (
                            <p>Loading</p>
                        )}
                    </div> 
                )}
            </div>
        )
    }
}


export default Profile;