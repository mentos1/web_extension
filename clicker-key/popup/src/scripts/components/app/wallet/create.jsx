import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";

class CreateWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txt: "Address create successfully",
            address: "wait..."
        };

        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        await this.createWallet();
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

    async createWallet() {
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

        response = await response.json();

        this.setState({address : response.address});
        chrome.extension.getBackgroundPage().console.log(response);
    }

    handleChange(event) {
        this.setState({pk: event.target.value});
    }

    render() {
        return (
            <div style={{overflow:'hidden', width:'200px'}}>
                {this.state.txt}
                <input value={this.state.address}/>
                <button>
                    <Link to={'/home_page'}>OK</Link>
                </button>
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
    };
};

export default connect(mapStateToProps)(CreateWallet);
