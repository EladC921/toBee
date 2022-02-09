import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  Button,
} from "react-native";
import React from "react";

const Profile = () => {
  return (
    <View style={styles.container}>
      {/** Header */}
      <View style={styles.header}>
        <Text style={styles.header_Text}> @JimmyNewton_012 </Text>
      </View>
      {/** Body */}
      <View style={styles.body_container}>
        {/** Profile Data */}
        <View style={styles.profile_data_container}>
          {/** Profile Picutre */}
          <View style={styles.profilePic_container}>
            <Image
              source={require("../Images/bee.png")}
              style={styles.profilePic}
            />
          </View>
          {/** Profile Name */}
          <View style={styles.profileName_container}>
            <Text> Jimmy Newton </Text>
            <Button title="Edit Profile" />
          </View>
        </View>
        {/** My - ToDo */}
        <View style={{ height: "70%", backgroundColor: "#fff" }}>
          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },

  header: {
    backgroundColor: "black",
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  header_Text: {
    top: "10%",
    color: "white",
    fontSize: 20,
  },

  body_container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },

  profile_data_container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    height: "30%",
    backgroundColor: "rgba(52, 52, 52, 0.2)",
  },

  profilePic: {
    resizeMode: "contain",
    height: 100,
    width: 100,
    borderWidth: 5,
    borderColor: "black",
    borderRadius: 50,
  },

  profilePic_container: {
    margin: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },

  profileName_container: {
    height: 100,
    justifyContent: "center",
    margin: 20,
  },
});

export default Profile;
