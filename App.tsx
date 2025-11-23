import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { store, persistor } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import { toastConfig } from './src/config/toastConfig';
import './global.css';
const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate
          loading={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ffffff',
              }}
            >
              <ActivityIndicator size="large" color="#0ea5e9" />
            </View>
          }
          persistor={persistor}
        >
          <SafeAreaProvider>
            <RootNavigator />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
};

export default App;
