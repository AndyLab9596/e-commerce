import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './app/store';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        autoHideDuration={3000}
        disableWindowBlurListener >

        <App />

      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
