import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './app/App';
import AddressListPage from './app/AddressApp/AddressList/AddressListPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={AddressListPage}/>
    </Route>
);