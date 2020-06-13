import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App.jsx';
import LoadingIndicator from './LoadingIndicator.jsx';

ReactDOM.render(
  <Provider store={store}>
    <App />
    <LoadingIndicator />
  </Provider>,
  document.querySelector('#root')
);

// ReactDOM.render(<App />, document.querySelector('#root'));
