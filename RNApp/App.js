import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from "./app/index.js"
import Info from "./app/info.js"
import ReportWrong from './app/reportWrong.js';
import Feedback from './app/feedback.js';
import BugReport from './app/bugReport.js';
import * as Updates from 'expo-updates';
import { useEffect, useRef } from 'react';
import analytics from '@react-native-firebase/analytics';
// import { Alert, Linking, BackHandler, View } from 'react-native';
import Login from './app/login.js';
import Chat from "./app/chat.js"

const Stack = createNativeStackNavigator()

export default function App() {
  const routeNameRef = useRef();
  const navigationRef = useRef();

  // useEffect(() => {
  //   Alert.alert("New version 1.2.0 Available", "Good news! This app is now available on Google Play Store.\nDownload the latest update from playstore", [{
  //     text: "Download", onPress: () => {
  //       Linking.openURL("https://play.google.com/store/apps/details?id=com.darkweeblet.classcompass")
  //     }
  //   }, {
  //     text: "Cancel", onPress: () => {
  //       BackHandler.exitApp()
  //     }
  //   }],)
  // }, [])

  async function CheckUpdates() {
    Updates.addListener(event => {
      if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        alert("Update available, Restart app")
        Updates.reloadAsync()
      }
    })
  }

  useEffect(() => CheckUpdates(), [])

  return <NavigationContainer ref={navigationRef}
    onReady={() => {
      routeNameRef.current = navigationRef.current.getCurrentRoute().name;
    }}
    onStateChange={async () => {
      const previousRouteName = routeNameRef.current;
      const currentRouteName = navigationRef.current.getCurrentRoute().name;

      if (previousRouteName !== currentRouteName) {
        await analytics().logScreenView({
          screen_name: currentRouteName,
          screen_class: currentRouteName,
        });
      }
      routeNameRef.current = currentRouteName;
    }}

  >
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Index} options={{ headerShown: false }} />
      <Stack.Screen name="Info" component={Info} options={{ headerShown: false }} />
      {/* <Stack.Screen name="ReportWrong" component={ReportWrong} options={{ headerShown: false }} />
      <Stack.Screen name="Feedback" component={Feedback} options={{ headerShown: false }} />
      <Stack.Screen name="BugReport" component={BugReport} options={{ headerShown: false }} /> */}
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
}
