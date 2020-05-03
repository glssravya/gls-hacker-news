import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import './index.css';
import reducers from './reducers/index';
import HackerNews from './components/hackerNews/hackerNews';
//import * as serviceWorker from './serviceWorker';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
console.log(reducers,'adfasd');
const store = createStoreWithMiddleware(reducers);
ReactDOM.render(
  
  <Provider store={store}>
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" exact component={HackerNews}></Route>
        <Route path="/page/:id" exact component={HackerNews}></Route>
      </Switch>
    </div>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
