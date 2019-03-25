import React from 'react';
import {render} from 'react-dom';

import App from './components/app/App';
import Wallet from './components/app/CreateWallet';
import CreateWallet from './components/app/wallet/create';
import ImportWallet from './components/app/wallet/import';
import HomePage from './components/app/HomePage';
import SendEth from './components/app/sendEth/index';
import confirmTx from './components/app/sendEth/confirmTx';

import {Store} from 'webext-redux';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const proxyStore = new Store();

proxyStore.ready().then(() => {
  render(
     <Provider store={proxyStore}>
        <Router>
            <div>
                <Route path="/popup.html" exact component={App} />
                <Route path="/wallet" exact component={Wallet} />
                <Route path="/create_wallet" exact component={CreateWallet} />
                <Route path="/import_wallet" exact component={ImportWallet} />
                <Route path="/home_page" exact component={HomePage} />
                <Route path="/send_eth" exact component={SendEth} />
                <Route path="/confirm_tx" exact component={confirmTx} />
            </div>
        </Router>
    </Provider>
    ,document.getElementById('app'));
});

