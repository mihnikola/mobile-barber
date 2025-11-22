// index.js
import { registerRootComponent } from 'expo';
import messaging from '@react-native-firebase/messaging';
import { ExpoRoot } from 'expo-router';

// 🔹 Background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('📩 Message handled in the background!', remoteMessage);
});

// 🔹 Render root app (Expo Router)
function App() {
  const ctx = require.context('./app');
  return <ExpoRoot context={ctx} />;
}

// 🔹 Registruj glavni entry
AppRegistry.registerComponent('main', () => App);
