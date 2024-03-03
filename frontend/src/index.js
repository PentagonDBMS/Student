import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import AuthProvider from './contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { ScreenSizeProvider } from './contexts/ScreenSizeContext'; // Assuming you've created this

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ScreenSizeProvider>
          <App />
        </ScreenSizeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
