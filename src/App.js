import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigation from './navigation/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { Linking } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';

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
    <StripeProvider publishableKey="pk_test_51OCDQFBcSamKvAztjX6vP7wREnhTfwk93daIRA25QA946sblaKwyrWLtQSzbmEakQk5K072xaOqzopwCpNvSDtaz00YXvZ1VXu">
      <SafeAreaProvider>
        <NavigationContainer linking={linking}>
          <StackNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </StripeProvider>
  );
}
