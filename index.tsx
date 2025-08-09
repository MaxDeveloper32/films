import React from 'react';
import { worker } from './src/server/server';
import ReactDOM from 'react-dom/client';
import App from './src/App';
import { Provider } from 'react-redux';
import { store } from './src/rtk/api.store';



if (process.env.NODE_ENV === 'development'){
  await worker.start();
}

const root = ReactDOM.createRoot(
  document.querySelector('#root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


