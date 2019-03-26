import React, {Component} from 'react';
import {connect} from 'react-redux';
import ImageAvatar from './ImageAvatar';
import { Link } from "react-router-dom";

class CreateWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txt: "Create wallet",
            pk: ""
        };

        this.handelCreateClick = this.handelCreateClick.bind(this);
        this.handelCreateByPkClick = this.handelCreateByPkClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', () => {
            this.props.dispatch({
                type: 'ADD_COUNT'
            });
        });
    }


    /*    async handelClick() {
            let response = await  fetch('https://wallet.primecore.io/auth/twitter/reverse',
                {
                    method: "POST"
                }
            );


            let data = await response.json();
            //chrome.extension.getBackgroundPage().console.log(data);

            chrome.identity.launchWebAuthFlow({url: `https://api.twitter.com/oauth/authenticate?oauth_token=${data.oauth_token}`, interactive: true}, function (url_string) {
                alert(url_string);
                chrome.extension.getBackgroundPage().console.log(url_string);
            });

        }*/

    async handelCreateClick() {
        let body = {
            token: this.props.token,
        };

        let response = await fetch('https://wallet.primecore.io/wallet_create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        chrome.extension.getBackgroundPage().console.log(response);
    }

    async handelCreateByPkClick(event) {
        event.preventDefault();

        let body = {
            token: this.props.token,
            pk: this.state.pk
        };

        let response = await fetch('https://wallet.primecore.io/wallet_create_by_pk', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        chrome.extension.getBackgroundPage().console.log(response);
    }

    handleChange(event) {
        this.setState({pk: event.target.value});
    }

    render() {
        let user = this.props.user;

        return (
            <div style={{overflow:'hidden', width:'200px'}}>
                {/*Click Count: {this.props.count}
                {this.state.txt}*/}
                <div style={{whiteSpace:'nowrap'}}>
                    <ImageAvatar url={user.photo} style={{width:'90px',display:'inline-block',border:'1px solid black'}} />
                    <div style={{width:'90px',display:'inline-block',marginBottom:'10px'}}>{user.name}</div>
                </div>
                <div>
                    <button>
                        <Link to={'/create_wallet'} style={{display: 'block', height: '100%'}}>Create Eth address</Link>
                    </button>
                    <button>
                        <Link to={'/import_wallet'} style={{display: 'block', height: '100%'}}>Import Eth address</Link>
                    </button>

                </div>
                {/*<div>
                    <form onSubmit={this.handelCreateByPkClick}>
                        <p><b>Insert your pk:</b></p>
                        <p><textarea value={this.state.pk} onChange={this.handleChange}/></p>
                        <p><input type="submit" value="send"/></p>
                    </form>
                </div>*/}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
    };
};

export default connect(mapStateToProps)(CreateWallet);
