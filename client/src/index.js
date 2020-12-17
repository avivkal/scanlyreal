import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { store } from './Store/store'
import { Provider } from 'react-redux'
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
// axios.defaults.baseURL = URL;
// const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// if(currentUser)
//   axios.defaults.headers.common['auth-token'] = currentUser.token;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

