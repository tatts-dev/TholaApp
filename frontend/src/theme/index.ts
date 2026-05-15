import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF9800', // Warm orange
    accent: '#2196F3', // Electric blue accents
    background: '#FAFAFA', // Cream/off-white
    surface: '#FFFFFF',
    text: '#1C1C1C', // Charcoal black
    error: '#B00020',
  },
  roundness: 12,
};
