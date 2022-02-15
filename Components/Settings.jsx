import {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import { auth } from "../db/firebaseSDK";
import SettingsList from "react-native-settings-list";

const Settings = (props) => {
  const [modal, setModal] = useState(false);
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        props.navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };
  const renderEmptyDate = () => {
    return (
      <View style={styles.container}>
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => { console.log("Modal has been closed.") }}>
          {/All views of Modal/}
          <View style={styles.modal}>
            <Text style={styles.text}>Modal is open!</Text>
            <Button title="Click To Close Modal" onPress={() => {
              this.setState({ isVisible: !this.state.isVisible })
            }} />
          </View>
        </Modal>
        {/Button will change state to true and view will re-render/}
        <Button
          title="Click To Open Modal"
          onPress={() => { this.setState({ isVisible: true }) }}
        />
      </View>
    );
  }
  const changePass = () => {
    var user = auth.currentUser;
    var newPassword = '1234567';
    alert(user)

    user.updatePassword(newPassword).then(function () {
      alert("updates")
      // Update successful.
    }).catch(function (error) {
      // An error happened.
    });
  }


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
            hasNavArrow={false}
            /*
            switchState={this.state.switchValue}
            switchOnValueChange={this.onValueChange}
            */
            switchOnValueChange={() => {
              return (
                <Modal></Modal>);
            }}
            hasSwitch={true}
            title="Switch Example"
          />
          <SettingsList.Item
            onPress={renderEmptyDate}
            titleInfo="Some Information"
            hasNavArrow={false}
            title="Information Example"
          />
          <SettingsList.Item onPress={handleSignOut} title="Settings 1" />
          <SettingsList.Item title="Settings 2" />
        </SettingsList>
        <TouchableOpacity onPress={() => {
          setModal(true);
        }} style={styles.btnLogout}>
          <Text style={{ color: "#fff" }}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut} style={styles.btnLogout}>
          <Text style={{ color: "#fff" }}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={{ borderRadius: 20 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal} >
          <KeyboardAvoidingView behavior="position" style={styles.container}>
            <View style={styles.modalView}>
              <View style={styles.modalContent}>
                <View style={styles.inputArea}>
                  <Text style={styles.inputLabel}>Task:</Text>
                  <TextInput
                    style={[styles.modalInput, { height: 30 }]}
                    
                  />

                </View>
                <View style={styles.inputArea}>
                  <Text style={styles.inputLabel}>Title:</Text>
                  <TextInput
                    style={[styles.modalInput, { height: 30 }]}
                    value={""}
                  />
                </View>
              </View>
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => {
                    //add new task
                    setModal(false);
                  }}
                >
                  <Text style={styles.addTask}>Add Task</Text>
                </TouchableOpacity>
              </View>
            </View></KeyboardAvoidingView>



        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.55,
    backgroundColor:"gray",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    top: "20%",
    bottom: "10%",
    width: "100%",
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },

  modalContent: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"gray",
    width: "100%",
    minWidth: "100%",
  },
  modalFooter: {
    flex: 2,
    backgroundColor:"gray",
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  inputArea: {
    flexDirection: "column",
    backgroundColor:"white",
    width: "100%",
    borderRadius:20,
    minWidth: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    margin: 10,
    marginLeft: 20,
    marginRight:20,
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
    
  },
  modalView: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    
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
    borderWidth: 1,
    borderRadius: 10,
    width: "80%",
    minWidth: "80%",

    marginLeft: 10,
    padding: 5,
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
