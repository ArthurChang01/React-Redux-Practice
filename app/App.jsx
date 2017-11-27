import React, { Component } from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import './App.scss';
//import CSSModules from 'react-css-modules';

import LayoutComponent from './components/layouts/LayoutComponent';
import store from './redux/store';

//@CSSModules(styles)
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <LayoutComponent />
      </Provider>
    );
  }
}