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
  const [password, setPassword] = useState();
  const [cpassword, setCPassword] = useState();
  
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
    var newPassword = cpassword;
    
    if(password===cpassword){
      user.updatePassword(newPassword).then(function () {
        alert("updates")
        // Update successful.
      }).catch(function (error) {
        // An error happened.
      });
    }
    else
    alert("New password is the same as old one")
  
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
            onPress={renderEmptyDate}
            titleInfo={auth.currentUser.email}
            hasNavArrow={false}
            title="Email:"
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
            title="Notifications"
          />
          <SettingsList.Item onPress={() => {
          setModal(true);
        }} title="Change Password" />
         
        </SettingsList>
        
        <TouchableOpacity onPress={handleSignOut} style={styles.btnLogout}>
          <Text style={{ color: "#fff" }}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={{ borderRadius: 20}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal} >
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
                    style={[styles.modalInput, { height: 30,color:"black" }]}
                    placeholderTextColor="black"
                    
                  />
                  
                </View>
            
              </View>
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() =>{changePass;setModal(false)}}
                >
                  <Text style={styles.addTask}>Change Password</Text>
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
    backgroundColor:"#E3E3E3",
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
    backgroundColor:"#E3E3E3",
    width: "100%",
    borderRadius:20,
    minWidth: "100%",
  },
  modalFooter: {
  
    paddingTop:10,
    backgroundColor:"white",
    width: "100%",
    borderRadius:20,
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
    paddingBottom:25,
    
  },
  modalView: {
    flex:1,
    width: "100%",
    backgroundColor: "#E3E3E3",
    borderRadius: 20,
    padding:20,
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
