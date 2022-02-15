import React, { useEffect } from "react";
// Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Components
import Home from "./Home";
import Profile from "./Profile";
import MyGroups from "./MyGroups";
import Calendaric from "./Calendaric";
import Settings from "./Settings";
// External
import { Ionicons } from "@expo/vector-icons";
import { Icon } from "react-native-elements";
import { TouchableOpacity, StyleSheet, View } from "react-native";

const Tab = createBottomTabNavigator();

const CoustomTabBTN = ({ children, onPress }) => (
  <TouchableOpacity
    style={{ top: -10, justifyContent: "center", alignItems: "center" }}
    onPress={onPress}
  >
    <View
      style={{
        width: 65,
        height: 65,
        borderRadius: 50,
        backgroundColor: "#FFFFFF",
        ...styles.shaddow,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const Tabs = ({ navigation, route }) => {

  const { user } = route.params;
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Profile"
        children={() => <Profile navigation={navigation} user={user} />}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon
                name="person"
                type="ionicon"
                iconStyle={styles.iconsStyle}
              />
            ) : (
              <Icon
                name="person-outline"
                type="ionicon"
                iconStyle={styles.iconsStyle}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Groups"
        children={() => <MyGroups navigation={navigation} user={user} />}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon
                name="people"
                type="ionicon"
                iconStyle={styles.iconsStyle}
              />
            ) : (
              <Icon
                name="people-outline"
                type="ionicon"
                iconStyle={styles.iconsStyle}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Home"
        children={() => <Home navigation={navigation} user={user} />}
        // component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon
                name="home"
                type="ionicon"
                iconStyle={styles.homeIconStyle}
              />
            ) : (
              <Icon
                name="home-outline"
                type="ionicon"
                iconStyle={styles.homeIconStyle}
              />
            ),
          tabBarButton: (props) => <CoustomTabBTN {...props} />,
        }}
      />
      <Tab.Screen
        name="Calendar"
        children={() => <Calendaric navigation={navigation} user={user} />}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon
                name="calendar"
                type="ionicon"
                iconStyle={styles.iconsStyle}
              />
            ) : (
              <Icon
                name="calendar-outline"
                type="ionicon"
                iconStyle={styles.iconsStyle}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Settings"
        children={() => <Settings navigation={navigation} user={user} />}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon name="cog" type="ionicon" iconStyle={styles.iconsStyle} />
            ) : (
              <Icon
                name="cog-outline"
                type="ionicon"
                iconStyle={styles.iconsStyle}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  shaddow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  iconsStyle: { fontWeight: "900", fontSize: 30, color: "#686868" },
  homeIconStyle: { fontWeight: "900", fontSize: 40, color: "#686868" },
});
export default Tabs;
