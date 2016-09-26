import React,{Component} from 'react';

import {HeaderComponent, FooterComponent} from './layout';

export default class LayoutComponent extends Component {
    render() {
        return <div>
            <HeaderComponent />
            <div className="container body-content">
                {this.props.children}
                <hr />
                <FooterComponent />
            </div>
        </div>;
    }
}