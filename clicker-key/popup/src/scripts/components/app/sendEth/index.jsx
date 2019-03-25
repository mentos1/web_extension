import React, {Component} from 'react';
import {connect} from 'react-redux';
import ImageAvatar from '../ImageAvatar';
import ReactSelect from './ReactSelect'
import {Link} from "react-router-dom";

class SendEth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txt: "Send Eth",
            options: [],
            eth_value: 0,
            to: {value: null, label: 'empty'},
            address: 'empty'
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.getFriends = this.getFriends.bind(this);
        this.handelUpdateTo = this.handelUpdateTo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getAddress = this.getAddress.bind(this);
    }

    async componentDidMount() {
        chrome.extension.getBackgroundPage().console.log('send index', this.props.token);
        if (this.props.token) {
            await this.getFriends();
        }
    }


    async getFriends() {
        let body = {
            token: this.props.token,
        };

        let response = await fetch('https://wallet.primecore.io/user/get_user_friends', {
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
        this.setState({options: this.fillterFriends(response.friends)});
    }

    async getAddress(user_id) {
        let body = {
            token: this.props.token,
            user_id
        };

        let response = await fetch('https://wallet.primecore.io/user/get_user_address', {
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
        chrome.extension.getBackgroundPage().console.log('address', response.address);
        this.setState({address: response.address});
        this.setState({hasWallet: response.status});
    }


    fillterFriends(friends) {
        return friends.map(friend => {
            return {
                value: friend.id,
                label: friend.name,
                photo: friend.profile_image_url.replace(/_normal/, '')
            }
        });
    }

    handelUpdateTo(to) {
        chrome.extension.getBackgroundPage().console.log('to', to);
        this.setState({to})
        this.getAddress(to.value);
    }

    handleChange(event) {
        this.setState({eth_value: event.target.value});
    }

    render() {
        let user = this.props.user;
        chrome.extension.getBackgroundPage().console.log('render');
        chrome.extension.getBackgroundPage().console.log(user, this.state.options);

        return (
            <div style={{overflow: 'hidden', width: '300px', height: '500px'}}>
                <ReactSelect options={this.state.options} updateTo={this.handelUpdateTo}/>
                <div>
                    <p>Send From</p>
                    <p>{user.address}</p>
                    <p>Send To</p>
                    <p>{this.state.address}</p>
                </div>
                <div>
                    <ImageAvatar url={this.state.to.photo}/>
                    <p>NAME {this.state.to.label}</p>
                    <p>friend's</p>
                    <p>Your balance {user.balance}</p>
                </div>

                <div>
                    <p>Eth amount</p>
                    <input value={this.state.eth_value} onChange={this.handleChange}/>
                    <button>
                        <Link to={
                            {
                                pathname: '/confirm_tx',
                                state: {
                                    user_id : this.state.to.value,
                                    user_label : this.state.to.label,
                                    amount: this.state.eth_value,
                                    hasWallet: this.state.hasWallet,
                                }
                            }
                        }
                              style={{display: 'block', height: '100%'}}
                        >
                            Create Eth address
                        </Link>
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        count: state.count,
        token: state.token,
        user: state.user,
    };
};

export default connect(mapStateToProps)(SendEth);
