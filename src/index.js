import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './assets/css/common/index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();