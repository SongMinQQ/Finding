import { MD3LightTheme as DefaultTheme, } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      ...DefaultTheme.colors,
      primary: '#007bff', 
    },
}

export default theme;