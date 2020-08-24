import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './src/store/configureStore';
import AppRouter from './src/routers/AppRouter';

export default function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}