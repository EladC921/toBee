import React from "react";
// Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Components
import Home from "./Home";
import Profile from "./Profile";
import MyGroups from "./MyGroups";
import Calendar from "./Calendar";
import Settings from "./Settings";
// External
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={32} />
            ) : (
              <Ionicons name="person-outline" size={32} />
            ),
        }}
      />
      <Tab.Screen
        name="Groups"
        component={MyGroups}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="people" size={32} />
            ) : (
              <Ionicons name="people-outline" size={32} />
            ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="home" size={32} />
            ) : (
              <Ionicons name="home-outline" size={32} />
            ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="calendar" size={32} />
            ) : (
              <Ionicons name="calendar-outline" size={32} />
            ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="cog" size={32} />
            ) : (
              <Ionicons name="cog-outline" size={32} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
