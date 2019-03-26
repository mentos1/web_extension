import React, {Component} from 'react';
import {connect} from 'react-redux';
import io from 'socket.io-client'
import { API_URL } from './config'
const socket = io(API_URL);
import { Redirect } from 'react-router'

class App extends Component {


    constructor(props) {
        super(props);
        this.state = {txt: "Добро пожаловать на сайт!"};

        this.handelClick = this.handelClick.bind(this);
        this.getUser = this.getUser.bind(this);
    }

    componentDidMount() {
        chrome.extension.getBackgroundPage().console.log(this.props, this.props.token);


        socket.on('twitter', user => {
            //chrome.extension.getBackgroundPage().console.log(user);
            //alert(user);
            //this.popup.close()
            //this.setState({user})
        })

        if (this.props.token) {
            this.getUser();
        }
    }


    async getUser() {
        let body = {
            token: this.props.token,
        };

        let response = await fetch('https://wallet.primecore.io/user/get', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });


        response = await response.json();

        chrome.extension.getBackgroundPage().console.log('______response__1_____');
        chrome.extension.getBackgroundPage().console.log(response);
        chrome.extension.getBackgroundPage().console.log('______response__2_____');

        this.props.dispatch({
            type: 'SET_USER',
            text: response
        });
    }


    async handelClick() {
        /*let response = await  fetch('https://wallet.primecore.io/auth/twitter/reverse',
            {
                method: "POST"
            }
        );


        let data = await response.json();
        chrome.extension.getBackgroundPage().console.log(data);*/

       /* chrome.identity.launchWebAuthFlow({url: `https://api.twitter.com/oauth/authenticate?oauth_token=${data.oauth_token}&socketId=${socket.id}`, interactive: true}, function (url_string) {
            chrome.extension.getBackgroundPage().console.log(url_string);
            alert(url_string);
        });*/
        chrome.extension.getBackgroundPage().console.log(socket, socket.id);

        this.props.dispatch({
            type: 'SET_TOKEN',
            text: socket.id
        });

        chrome.identity.launchWebAuthFlow({url: `https://wallet.primecore.io/twitter/?socketId=${socket.id}`, interactive: true}, function (url_string) {
            chrome.extension.getBackgroundPage().console.log(url_string);
            alert(url_string);
        });


    }

    render() {
        chrome.extension.getBackgroundPage().console.log(Object.values(this.props.user).length && this.props.token, this.props.token, Object.values(this.props.user).length);
        return (
            this.props.token && Object.values(this.props.user).length  ? (
                    this.props.user.address !== null  ? (
                        <Redirect to="/home_page"/>
                    ) : (
                        <Redirect to="/wallet"/>
                    )

            ) : (
                <div style={{overflow: 'hidden', width: '200px', height: '200px'}}>
                    <div>
                        <button onClick={this.handelClick}>
                            twitter
                        </button>
                    </div>
                </div>
            )
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
    };
};

export default connect(mapStateToProps)(App);
