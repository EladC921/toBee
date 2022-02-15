import {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { auth } from "../db/firebaseSDK";
import SettingsList from "react-native-settings-list";

const Settings = (props) => {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        props.navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={{ scrollEnabled: "flase", backgroundColor: "gray", flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          borderRadius: 20,
          marginTop: 50,
          paddingTop: 40,
        }}
      >
        <SettingsList>
          <SettingsList.Header
            headerText="First Grouping"
            style={styles.header}
            headerStyle={{ color: "white" }}
          />
          <SettingsList.Item
            itemWidth={50}
            title="Icon Example"
            onPress={() => Alert.alert("Icon Example Pressed")}
          />
          <SettingsList.Item
            hasNavArrow={false}
            /*
            switchState={this.state.switchValue}
            switchOnValueChange={this.onValueChange}
            */
            hasSwitch={true}
            title="Switch Example"
          />
        </SettingsList>
      </View>
      <View
        style={{
          paddingBottom: 10,
          flex: 1,
          backgroundColor: "white",
          borderTopEndRadius: 30,
          borderTopLeftRadius: 30,
          marginTop: 30,
        }}
      >
        <SettingsList scrollEnabled={false}>
          <SettingsList.Header
            headerText="Different Grouping"
            headerStyle={{ color: "white", marginTop: 50 }}
          />

          <SettingsList.Item
            titleInfo="Some Information"
            hasNavArrow={false}
            title="Information Example"
          />
          <SettingsList.Item title="Settings 1" />
          <SettingsList.Item title="Settings 2" />
        </SettingsList>
        <TouchableOpacity onPress={handleSignOut} style={styles.btnLogout}>
          <Text style={{ color: "#fff" }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  btnLogout: {
    backgroundColor: "red",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
});

export default Settings;
