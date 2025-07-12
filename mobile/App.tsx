import WelcomeScreen from "@/screens/welcome/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
