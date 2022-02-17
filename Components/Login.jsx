import {
  StyleSheet,
  ImageBackground,
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
import { Icon } from "react-native-elements/dist/icons/Icon";

import { auth } from "../db/firebaseSDK";
import RegisterModal from "./RegisterModal";

const Login = ({ navigation }) => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [modal, setModal] = useState(false);
  const [forgotEmail, setforgotEmail] = useState("");

  const getUserRequest = (mail) => {
    let api_getUser =
      "https://proj.ruppin.ac.il/bgroup68/test2/tar5/api/Users?mail='" +
      mail +
      "'";
    fetch(api_getUser, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log(api_getUser);
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch getUser= ", result);
          console.log(result.Uid);
          navigation.navigate("Main", { user: result });
        },
        (error) => {
          console.log("err GET=", error);
        }
      );
  };

  const forgotPassword = () => {
    if (!forgotEmail) {
      alert("Please fill  the field");
      return false;
    }
    if (validateEmail(forgotEmail)) {
      auth.sendPasswordResetEmail(forgotEmail);
      setforgotEmail("");
      alert("Check your mail");
    } else alert("Wrong email format");
  };

  const validateEmail = (email) => {
    return String(email).toLowerCase().match("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  };

  // login after register
  auth.onAuthStateChanged(function (user) {
    if (user) {
      console.log(
        "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
        user.email
      );
      // set timeout before doing get request
      getUserRequest(user.email);
    }
  });

  const handleLogin = () => {
    if (email && password) {
      try {
        auth
          .signInWithEmailAndPassword(email, password)
          .then((userCredentials) => {
            getUserRequest(email);
          })
          .catch((error) => alert(error.message));
      } catch (error) {
        alert(error.message);
      }
    } else alert("You have to enter both email and password");
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.container}>
            <View style={styles.imgContainer}>
              <Image
                source={require("../Images/bee.png")}
                style={styles.images}
              />
            </View>
            <View style={styles.logoContainer2}>
              <Text style={styles.logo}>toBee</Text>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.inputView}>
                <TextInput
                  keyboardType="email-address"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  style={styles.inputText}
                  placeholder="Email..."
                  placeholderTextColor="gray"
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  secureTextEntry
                  style={styles.inputText}
                  placeholder="Password..."
                  placeholderTextColor="gray"
                  onChangeText={(text) => setPassword(text)}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  handleLogin();
                }}
                style={styles.loginBtn}
              >
                <Text style={styles.loginText}>LOGIN</Text>
              </TouchableOpacity>
              <RegisterModal />
              <TouchableOpacity
                onPress={() => {
                  setModal(true);
                }}
                style={styles.forgotBtn}
              >
                <Text style={styles.loginText}>Forgot password?</Text>
              </TouchableOpacity>
              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modal}
                  onRequestClose={() => {
                    setforgotEmail("");
                    setModal(!modal);
                  }}
                >
                  <View style={styles.modalView}>
                    <View style={styles.modalHeader}>
                      <Pressable
                        style={[styles.closeBtn, styles.btnContainer]}
                        onPress={() => {
                          setModal(!modal);
                        }}
                      >
                        <Icon
                          name="close-outline"
                          type="ionicon"
                          color="#000000"
                          iconStyle={{ fontWeight: "1600" }}
                        />
                      </Pressable>
                    </View>
                    {/** Inputs Area */}
                    <View style={styles.modalContent}>
                      <View style={styles.inputArea}>
                        <Text style={styles.inputLabel}>
                          Insert your Email:
                        </Text>
                        <TextInput
                          style={[styles.modalInput, { height: 40 }]}
                          value={forgotEmail}
                          onChange={(e) => setforgotEmail(e.nativeEvent.text)}
                        />
                      </View>
                    </View>
                    {/** Buttons Area */}
                    <View style={styles.modalFooter}>
                      <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => {
                          forgotPassword(); //add new task
                        }}
                      >
                        <Text style={styles.addTask}>Reset Password</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  logoContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  images: {
    width: 100,
    height: 70,
    overflow: "visible",
  },
  imgContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#000000",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logo_reg: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#B35A3F",
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
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
    color: "#0E0E0E",
    textAlign: "left",
  },

  loginBtn: {
    width: "50%",
    backgroundColor: "#FEC108",
    borderRadius: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  loginText: {
    color: "#000000",
  },
  forgotBtn: {
    width: "50%",
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
  modalView: {
    marginTop: 100,
    flex: 0.5,
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

  btnContainer: {
    position: "absolute",
    right: "2%",
    top: "5%",
    alignItems: "center",
    borderRadius: 800,
  },

  modalHeader: {
    flex: 1,
    backgroundColor: "#E3E3E3",
    width: "100%",
    minWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: "black",
  },

  modalContent: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minWidth: "100%",
  },

  inputArea: {
    flexDirection: "column",
    width: "100%",
    minWidth: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    margin: 10,
    marginLeft: 20,
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

  inputLabel: {
    fontSize: 16,
    fontWeight: "700",
    margin: 10,
    color: "#4a4b4d",
  },

  modalFooter: {
    flex: 2,
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  addTask: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4a4b4d",
  },

  addBtn: {
    backgroundColor: "#FFCB2D",
    borderRadius: 20,
    padding: 15,
  },

  closeBtn: {
    borderRadius: 20,
    padding: 2,
    elevation: 2,
  },
});

export default Login;
