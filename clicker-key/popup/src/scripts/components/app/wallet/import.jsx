import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

class ImportWallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txt: "Create wallet",
            pk: "",
            address: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handelCreateByPkClick = this.handelCreateByPkClick.bind(this);
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


        response = await response.json();
        this.setState({address: response.address});
        chrome.extension.getBackgroundPage().console.log(response.address);
    }

    handleChange(event) {
        this.setState({pk: event.target.value});
    }

    render() {

        const state = this.state.address ? (
            <div>
                <input value={this.state.address}/>
                <button>
                    <Link to={'/home_page'}>OK</Link>
                </button>
            </div>
        ) : (
            <div>
                <form onSubmit={this.handelCreateByPkClick}>
                    <p><b>Insert your pk:</b></p>
                    <p><textarea value={this.state.pk} onChange={this.handleChange}/></p>
                    <p><input type="submit" value="send"/></p>
                </form>
            </div>
        );

        return (
            <div style={{overflow: 'hidden', width: '200px'}}>
                {this.state.txt}
                {state}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
    };
};

export default connect(mapStateToProps)(ImportWallet);
