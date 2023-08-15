import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {legacy_createStore as createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './services/reducers/Index'
const store=createStore(rootReducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
  <App />
  </Provider>
    
  </React.StrictMode>
);


reportWebVitals();
