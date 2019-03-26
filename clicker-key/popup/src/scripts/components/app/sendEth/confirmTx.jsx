import React, {Component} from 'react';
import {connect} from 'react-redux';


class confirmTx extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txt: "Send Eth",
            hash: null,
            status_send: false,
        };

        this.sendEth = this.sendEth.bind(this);
    }

    async sendEth() {
        const {amount, user_id} = this.props.location.state;

        let body = {
            token: this.props.token,
            amount,
            user_id,
        };

        this.setState({status_send : true})
        let response = await fetch('https://wallet.primecore.io/wallet/send_eth', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        chrome.extension.getBackgroundPage().console.log('response', response);

        response = await response.json();
        /*
                chrome.extension.getBackgroundPage().console.log('friends', response.friends);
                chrome.extension.getBackgroundPage().console.log(this.fillterFriends(response.friends));*/
        chrome.extension.getBackgroundPage().console.log('hash', response.msg);
        this.setState({hash: response.msg});
    }

    render() {
        const {amount, user_label, hasWallet} = this.props.location.state;

        let state = hasWallet ? (
            <p>
                Your transaction has been sent!
            </p>
        ) : (
            <p>
                We sent transaction and informed your friend by PM.
            </p>
        );

        return (
            !this.state.status_send ? (
                <div style={{overflow: 'hidden', width: '300px', height: '500px'}}>
                    <p>
                        You are sending {amount} ETH to {user_label}
                    </p>
                    <p>
                        Please confirm transaction
                    </p>
                    <button onClick={this.sendEth}>
                        SEND {amount} ETH
                    </button>
                </div>
            ) : (
                <div style={{overflow: 'hidden', width: '300px', height: '500px'}}>
                    {state}
                    {/*<p>
                        hash {this.state.hash}
                    </p>*/}
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

export default connect(mapStateToProps)(confirmTx);
