/**
 * Created by caoquang on 07/10/2017.
 */
import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

import {appRoute} from '../../utils';

class HeaderComponent extends Component{
    static contextTypes = {
        router: PropTypes.object
    };
    render(){
        return (
                <nav className={"navbar navbar-default"}>
                    <div className={"container-fluid"}>
                        <div className={"navbar-header"}>
                            <button type="button" className={"navbar-toggle collapsed"} data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className={"sr-only"}>Toggle navigation</span>
                                <span className={"icon-bar"}></span>
                                <span className={"icon-bar"}></span>
                                <span className={"icon-bar"}></span>
                            </button>
                            <Link role="presentation" className={"navbar-brand"} to={appRoute.root}>8Bit_exercise</Link>
                        </div>
                        <div className={"collapse navbar-collapse"} id="bs-example-navbar-collapse-1"></div>
                    </div>
                </nav>
        )
    }
}
export default HeaderComponent;