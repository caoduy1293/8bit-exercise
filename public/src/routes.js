import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './app/App';
import AddressListPage from './app/AddressApp/AddressList/AddressListPage';
import AddressDetailPage from './app/AddressApp/AdressDetail/AddressDetailPage';
import NewAddressPage from './app/AddressApp/NewAddress/NewAddressPage';
import {appRoute} from './ultility';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={AddressListPage}/>
        <Route path={appRoute.addressEdit + ':id'} component={AddressDetailPage} />
        <Route path={appRoute.addressNew} component={NewAddressPage} />
    </Route>
);