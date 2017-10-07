import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './app/App';
import AddressListPage from './app/AddressApp/AddressList/AddressListPage';
import AddressDetailPage from './app/AddressApp/AdressDetail/AddressDetailPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={AddressListPage}/>
        <Route path="address/:id" component={AddressDetailPage} />
    </Route>
);