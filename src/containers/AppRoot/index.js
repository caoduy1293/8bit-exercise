/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import {Switch} from 'react-router-dom';
import { Layout } from 'antd';
import ReduxToastr from 'react-redux-toastr'

import DashBoardApp from '../DashBoardApp/Loadable';
import NotFoundPage from '../SharedComponent/NotFoundPage/Loadable';

import "../../assets/css/globalStyle.css";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'nprogress/nprogress.css';
import './FancyRoute.css'

import FancyRoute from "./FancyRoute";

const rootRoutes = [
    {
        title: 'DashBoard App',
        exact: true,
        path: '/',
        component: DashBoardApp
    },
    {
        title: 'Not Found',
        path: '',
        component: NotFoundPage
    }
];


class App extends React.Component{
    render() {
        return (
            <Layout style={{ padding: '20px 0', minHeight: '100vh' }}>
                <Helmet
                    titleTemplate="%s - Demo App"
                    defaultTitle="Demo App"
                >
                    <meta name="description" content="Demo App" />
                </Helmet>
                <Switch>
                    {rootRoutes.map((route, i) =>
                        <FancyRoute key={i} {...route} />
                    )}
                </Switch>
                {/*<Footer />*/}
                <ReduxToastr
                    timeOut={4000}
                    newestOnTop={true}
                    preventDuplicates
                    position="bottom-center"
                    transitionIn="bounceIn"
                    transitionOut="bounceOut"
                    progressBar={false}/>
            </Layout>
        );
    }
}

// const connectedApp = connect(null)(App);
export default App;
