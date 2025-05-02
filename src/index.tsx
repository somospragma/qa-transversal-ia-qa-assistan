import React from 'react';
import ReactDOM from 'react-dom/client';
import './base.scss';
import App from './App';
import {Provider} from 'react-redux';
import {store} from 'store';
import { UserPreferencesProvider } from 'shared/context/userPreferences.context';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
        <UserPreferencesProvider>
      <Provider store={store} >
        <App />
      </Provider>
      </UserPreferencesProvider>
  </React.StrictMode>
);
reportWebVitals();
