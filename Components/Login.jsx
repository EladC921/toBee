import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../db/firebaseSDK";
import RegisterModal from "./RegisterModal";

const Login = ({ navigation }) => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

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

  auth.onAuthStateChanged(function (user) {
    if (user) getUserRequest(user.email);
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
});

export default Login;
