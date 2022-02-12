import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { auth } from '../db/firebaseSDK';

const Settings = ({ navigation }) => {
const handleSignOut = () => {
 auth 
    .signOut()
    .then(() => {
      navigation.navigate("Login")
    })
    .catch(error => alert(error.message))

}

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.btnLogout}
      >
        <Text style={{ color: "#fff" }}>Logout</Text>
      </TouchableOpacity>
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
  },
});

export default Settings;
