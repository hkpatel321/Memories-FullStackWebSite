import React from 'react';
import ReactDOM from 'react-dom'; // Changed from 'react-dom/client'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import {createStore,applyMiddleware,compose}from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import './index.css'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
const store=createStore(reducers,compose(applyMiddleware(thunk)));
ReactDOM.render(
    <BrowserRouter>
    <Provider store={store}>
          <App />
    </Provider>,
    </BrowserRouter>,


  document.getElementById('root')
);

reportWebVitals();
