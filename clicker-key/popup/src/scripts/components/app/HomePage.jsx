import React, {Component} from 'react';
import {connect} from 'react-redux';
import ImageAvatar from './ImageAvatar';
import {Link} from "react-router-dom";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txt: "Create wallet",
            pk: ""
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.getUser = this.getUser.bind(this);
        this.logout = this.logout.bind(this);
    }

    async componentDidMount() {
        //5A0A15040AB2C28FD3C062A0D6B20DA591CF61536387295603AC742D98AB7E69
        chrome.extension.getBackgroundPage().console.log('this.props.user', this.props.user);
        await this.getUser();
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


        chrome.extension.getBackgroundPage().console.log('response', response);

        if (response.ok === false && response.status === 304) {
            this.props.dispatch({
                type: 'SET_USER',
                text: null
            });
            return;

        }

        response = await response.json();
        chrome.extension.getBackgroundPage().console.log('response json', response.json);

        this.props.dispatch({
            type: 'SET_USER',
            text: response
        });
    }

    async logout() {

        let body = {
            token: this.props.token,
        };

        chrome.identity.launchWebAuthFlow({url: `https://twitter.com/logout`, interactive: true}, function (url_string) {
            chrome.extension.getBackgroundPage().console.log(url_string);
            //alert(url_string);
        });

        this.props.dispatch({
            type: 'SET_USER',
            text: null
        });

        this.props.dispatch({
            type: 'SET_TOKEN',
            text: null
        });

        window.close();

    }


    render() {
        let user = this.props.user;
        chrome.extension.getBackgroundPage().console.log(user);

        return (
            (user) ? (
                <div style={{overflow: 'hidden', width: '200px'}}>
                    {/*Click Count: {this.props.count}
                {this.state.txt}*/}
                    <div style={{whiteSpace: 'nowrap'}}>
                        <ImageAvatar url={user.photo}
                                     style={{width: '90px', display: 'inline-block', border: '1px solid black'}}/>
                        <div style={{width: '90px', display: 'inline-block', marginBottom: '10px'}}>{user.name}</div>
                        <div style={{
                            width: '90px',
                            display: 'inline-block',
                            marginBottom: '10px'
                        }}>Balance {user.balance} ETH
                        </div>
                    </div>
                    <div>
                        <input value={user.address} placeholder="0xe72a..." defaultValue="empty"/>
                        <button>
                            <Link to={'/send_eth'} style={{display: 'block', height: '100%'}}>Send</Link>
                        </button>
                        <button onClick={this.logout}>
                            Logout
                        </button>

                    </div>
                </div>
            ) : (
                <div/>
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

export default connect(mapStateToProps)(HomePage);
