import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import configureStore from './src/store/configureStore';
import AppRouter from './src/routers/AppRouter';
import colors from './src/config/colors';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.secondary,
    accent: colors.secondary,
    text: colors.secondary
  },
};

export default function App() {
  const store = configureStore();
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <AppRouter />
      </PaperProvider>
    </StoreProvider>
  );
}