import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import { auth } from "../db/firebaseSDK";
import SettingsList from "react-native-settings-list";

const Settings = (props) => {
  const [password, setPassword] = useState();
  const [cpassword, setCPassword] = useState();
  const [modal, setModal] = useState(false);
  const [Umodal, setUModal] = useState(false);
  const [FirstName, setFirstName] = useState(props.user.FirstName);
  const [LastName, setLastName] = useState(props.user.LastName);

  let u = props.user;

  const putUserName = () => {
    if (FirstName === "") {
      u.FirstName = props.user.FirstName;
    } else u.FirstName = FirstName;

    if (LastName === "") {
      u.LastName = props.user.LastName;
    } else u.LastName = LastName;

    let apiUrl_PutUser =
      "https://proj.ruppin.ac.il/bgroup68/test2/tar5/api/Users/EditUserProfile";
    fetch(apiUrl_PutUser, {
      method: "PUT",
      body: JSON.stringify(u),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch PUT= ", result);
        },
        (error) => {
          console.log("err put=", error);
        }
      );
  };
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        props.navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  const changePass = () => {
    var user = auth.currentUser;
    var newPassword = cpassword;

    if (password === cpassword) {
      user
        .updatePassword(newPassword)
        .then(function () {
          alert("updates");
          // Update successful.
        })
        .catch(function (error) {
          // An error happened.
        });
    } else alert("New password is the same as old one");
  };

  return (
    <View style={{ scrollEnabled: "flase", backgroundColor: "gray", flex: 1 }}>
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
            titleInfo={auth.currentUser.email}
            hasNavArrow={false}
            title="Email:"
          />
          <SettingsList.Item
            onPress={() => {
              setUModal(true);
            }}
            title="Change Name"
          />
          <SettingsList.Item
            onPress={() => {
              setModal(true);
            }}
            title="Change Password"
          />
        </SettingsList>
        <TouchableOpacity onPress={handleSignOut} style={styles.btnLogout}>
          <Text style={{ color: "#fff" }}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={{ borderRadius: 20 }}>
        <Modal animationType="slide" transparent={true} visible={modal}>
          <KeyboardAvoidingView behavior="position" style={styles.container}>
            <View style={styles.modalView}>
              <View style={styles.modalContent}>
                <View style={styles.inputArea}>
                  <Text style={styles.inputLabel}>Old Password:</Text>
                  <TextInput
                    placeholder="Password..."
                    onChangeText={(text) => setPassword(text)}
                    style={[styles.modalInput, { height: 30 }]}
                    placeholderTextColor="black"
                  />
                </View>
                <View style={styles.inputArea}>
                  <Text style={styles.inputLabel}>New Password:</Text>
                  <TextInput
                    placeholder="Password..."
                    onChangeText={(text) => setCPassword(text)}
                    style={[styles.modalInput, { height: 30, color: "black" }]}
                    placeholderTextColor="black"
                  />
                </View>
              </View>
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => {
                    changePass;
                    setModal(false);
                  }}
                >
                  <Text style={styles.addTask}>Change Password</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>

      <View style={{ borderRadius: 20 }}>
        <Modal animationType="slide" transparent={true} visible={Umodal}>
          <KeyboardAvoidingView behavior="position" style={styles.container}>
            <View style={styles.modalView}>
              <View style={styles.modalContent}>
                <View style={styles.inputArea}>
                  <Text style={styles.inputLabel}>Fisrt Name:</Text>
                  <TextInput
                    placeholder="Firstname.."
                    onChangeText={(text) => setFirstName(text)}
                    style={[styles.modalInput, { height: 30 }]}
                    placeholderTextColor="black"
                  />
                </View>
                <View style={styles.inputArea}>
                  <Text style={styles.inputLabel}>Last Name:</Text>
                  <TextInput
                    placeholder="Lastname.."
                    onChangeText={(text) => setLastName(text)}
                    style={[styles.modalInput, { height: 30, color: "black" }]}
                    placeholderTextColor="black"
                  />
                </View>
              </View>
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => {
                    putUserName();
                    setUModal(false);
                  }}
                >
                  <Text style={styles.addTask}>Change Name</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.55,
    backgroundColor: "#E3E3E3",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    top: "20%",
    bottom: "10%",
    width: "100%",
  },

  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3E3E3",
    width: "100%",
    borderRadius: 20,
    minWidth: "100%",
  },
  modalFooter: {
    paddingTop: 10,
    backgroundColor: "white",
    width: "100%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputArea: {
    flexDirection: "column",
    backgroundColor: "white",
    width: "100%",
    borderRadius: 20,
    minWidth: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addTask: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4a4b4d",
    paddingBottom: 25,
  },
  modalView: {
    flex: 1,
    width: "100%",
    backgroundColor: "#E3E3E3",
    borderRadius: 20,
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  inputLabel: {
    fontSize: 16,
    fontWeight: "700",
    margin: 10,
    color: "#4a4b4d",
  },
  modalInput: {
    borderColor: "black",

    borderRadius: 10,
    width: "80%",
    minWidth: "80%",

    marginLeft: 10,
    padding: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
