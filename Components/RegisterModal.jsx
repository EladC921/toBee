import {
  StyleSheet,
  Pressable,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import { auth } from "../db/firebaseSDK";

const RegisterModal = () => {
  const handleSignUp = () => {
    if (signmail && csignpass && signpass) {
      if (signpass == csignpass) {
        auth
          .createUserWithEmailAndPassword(signmail, csignpass)
          .then((userCredentials) => {
            const user = userCredentials.user;
            setOpenModal(false);
          })
          .catch((error) => alert(error.message));
      } else {
        alert("The passwords do not match");
      }
    } else alert("Please enter all required fields");
  };

  const [signmail, setSignupmail] = useState();
  const [csignpass, setcpass] = useState();
  const [signpass, setsignpass] = useState();
  const [openModal, setOpenModal] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setOpenModal(true)}>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>

      <Modal visible={openModal} animationType="slide" transparent={true}>
        <KeyboardAvoidingView behavior="position" style={styles.container}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.xbut}
              onPress={() => setOpenModal(false)}
            >
              <Text>X</Text>
            </TouchableOpacity>
            <Text style={styles.logo_reg}>Sign up</Text>
            <View style={styles.flname}>
              <View style={styles.flview}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Name"
                  placeholderTextColor="white"
                />
              </View>
              <View style={styles.flview}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Surname"
                  placeholderTextColor="white"
                />
              </View>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Enter Nickname..."
                placeholderTextColor="white"
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                keyboardType="phone-pad"
                style={styles.inputText}
                placeholder="Enter Phone number..."
                placeholderTextColor="white"
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                keyboardType="email-address"
                style={styles.inputText}
                placeholder="Enter Email..."
                placeholderTextColor="white"
                onChangeText={(text) => setSignupmail(text)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder="Enter Password..."
                placeholderTextColor="white"
                onChangeText={(text) => setsignpass(text)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder="Confirm Password..."
                placeholderTextColor="white"
                onChangeText={(text) => setcpass(text)}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                handleSignUp();
              }}
              style={styles.loginBtn}
            >
              <Text style={styles.loginText}>Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE889",
    alignItems: "center",
    marginTop: 22,
    width: "100%",
  },

  safeAreaView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flname: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },

  logo_reg: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#B35A3F",
    position: "absolute",
    top: 10,
  },
  loginBtn: {
    marginTop: 20,
    width: "50%",
    backgroundColor: "#B35A3F",
    borderRadius: 25,
    height: 50,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  flview: {
    width: "45%",
    backgroundColor: "#B35A3F",
    borderRadius: 25,
    height: 50,

    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#B35A3F",
    borderRadius: 25,
    height: 50,

    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputText: {
    height: 50,
    color: "white",
    textAlign: "left",
  },

  forgot: {
    color: "white",
    fontSize: 11,
  },

  loginText: {
    color: "black",
  },

  modalView: {
    height: "70%",
    padding: 70,
    margin: 20,
    flex: 1,

    backgroundColor: "white",
    borderRadius: 55,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  xbut: {
    borderWidth: 2,
    backgroundColor: "#B35A3F",
    borderColor: "#B35A3F",
    borderRadius: 10,
    alignItems: "center",
    paddingTop: 5,
    height: 30,
    width: 30,
    marginRight: 340,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default RegisterModal;
