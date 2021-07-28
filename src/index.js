



import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import App from './App';
import {createStore} from "redux";
import {Provider} from "react-redux";
import allReducers from "./redux/reducers";

import {QueryParamProvider} from "use-query-params";

const store = createStore(
    allReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <BrowserRouter>
      <QueryParamProvider>
          <Provider store={store}>
              <App />
          </Provider>
      </QueryParamProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

