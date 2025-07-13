import { ThemeProvider } from "@/context/ThemeContext";
import LoginScreen from "@/screens/auth/LoginScreen";
import RegisterScreen from "@/screens/auth/RegisterScreen";
import BlogDetailScreen from "@/screens/blog-detail/BlogDetailScreen";
import HomeScreen from "@/screens/home/HomeScreen";
import WelcomeScreen from "@/screens/welcome/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="BlogDetail" component={BlogDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
