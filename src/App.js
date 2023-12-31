import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigation from './navigation/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { Linking } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import LoadingSpinner from './Loading/LoadingSpinner';
import { useContext } from 'react';
import { LoadingContext, LoadingContextProvider } from './Loading/LoadingContext';
import store from './redux/redux';
import { Provider } from 'react-redux';

const linking = {
  prefixes: ['finding://'],
  config: {
    screens: {
      PaymentFinish: 'payment/finish',
      Home: '',
      // 다른 스크린 구성...
    },
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey="pk_test_51OCDQFBcSamKvAztjX6vP7wREnhTfwk93daIRA25QA946sblaKwyrWLtQSzbmEakQk5K072xaOqzopwCpNvSDtaz00YXvZ1VXu">
        <SafeAreaProvider>
          <LoadingContextProvider>
            <NavigationContainer linking={linking}>
              <StackNavigation />
            </NavigationContainer>
            
          </LoadingContextProvider>
        </SafeAreaProvider>
      </StripeProvider>
    </Provider>
  );
}
