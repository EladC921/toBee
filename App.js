import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
// React Native Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Nav Component
import Tabs from "./Components/Tabs";
import Login from "./Components/Login";
import Group from "./Components/Group";
import CameraComp from "./Components/CameraComp";
import GalleryComp from "./Components/GalleryComp";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Main"
          component={Tabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GroupPage"
          component={Group}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CameraComp"
          component={CameraComp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GalleryComp"
          component={GalleryComp}
          options={{
            headerShown: true,
            title: "Gallery",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
