
import { ExpoRoot } from 'expo-router';
import { AppRegistry } from 'react-native';
function App() {
  const ctx = require.context('./app');
  return <ExpoRoot context={ctx} />;
}
AppRegistry.registerComponent('main', () => App);
