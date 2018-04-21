import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import Page from './page';
import Reducer from './reducer';
import { IntlProvider } from 'react-intl';
import registerServiceWorker from './registerServiceWorker';

//redux 注入
const store = createStore(Reducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <IntlProvider locale="en">
    <AppContainer>
      <Provider store = {store}>
        <Page />
      </Provider>
    </AppContainer>
  </IntlProvider>
  , document.getElementById('root'));

registerServiceWorker();
