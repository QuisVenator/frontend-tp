import {Navigation} from 'react-native-navigation';

export function registerScreens() {
  Navigation.registerComponent(
    'FrontendTP.HomeScreen',
    () => require('./clinic/screens/home.tsx').default,
  );
}
