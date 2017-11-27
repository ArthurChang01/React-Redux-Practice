import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';

import registerServiceWorker from './assets/registerServiceWorker'

render(
    <App />,
    document.getElementById('app'));
registerServiceWorker();

if (process.env.NODE_ENV === 'development')
    module.hot.accept();