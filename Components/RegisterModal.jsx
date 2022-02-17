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
import { Icon } from "react-native-elements/dist/icons/Icon";

const RegisterModal = () => {
  const [signnickname, setSignNickname] = useState("");
  const [signfirstname, setSignFirstName] = useState("");
  const [signlastname, setSignLastName] = useState("");
  const [signphone, setSignPhone] = useState("");
  const [signmail, setSignupmail] = useState("");
  const [csignpass, setcpass] = useState("");
  const [signpass, setsignpass] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // Form validation
  const validate = () => {
    if (signphone) {
      let num = signphone.replace(".", "");
      num = num.replace("-", "");
      if (isNaN(num)) {
        alert("Invalid phone number");
        return false;
      } else if (num.length < 10) {
        alert("Phone number is too short");
        return false;
      } else setSignPhone(num);
    } else {
      alert("Please insert phone number");
      return false;
    }

    if (!signfirstname || !signlastname) {
      alert("Your friends should know your name");
      return false;
    }

    if (!signnickname) {
      alert("Please insert a nickname");
      return false;
    }

    return true;
  };

  // Post user to the DB
  const postUserRequest = () => {
    let newUser = {
      Nickname: signnickname,
      FirstName: signfirstname,
      LastName: signlastname,
      Mail: signmail,
      PhoneNum: signphone,
      ImgURL:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
    };
    let apiUrl_PostUser =
      "https://proj.ruppin.ac.il/bgroup68/test2/tar5/api/Users";

    fetch(apiUrl_PostUser, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("POST User request:\n");
        console.log("supposed to be=", newUser);
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  const handleSignUp = () => {
    if (!validate()) return;
    if (signmail && csignpass && signpass) {
      if (signpass == csignpass) {
        auth
          .createUserWithEmailAndPassword(signmail, csignpass)
          .then((userCredentials) => {
            postUserRequest();
            setOpenModal(false);
            const user = userCredentials.user;
          }) // -->
          // <--
          .catch((error) => alert(error.message));
      } else {
        alert("The passwords do not match");
      }
    } else alert("Please enter all required fields");
  };
  return (
    <View>
      <TouchableOpacity onPress={() => setOpenModal(true)}>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>

      <Modal visible={openModal} animationType="slide" transparent={true}>
        {/* <KeyboardAvoidingView behavior="position" style={styles.container}> */}
        <View style={styles.container}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.btnContainer}
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
                  placeholderTextColor="#000000"
                  onChangeText={(text) => setSignFirstName(text)}
                />
              </View>
              <View style={styles.flview}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Surname"
                  placeholderTextColor="#000000"
                  onChangeText={(text) => setSignLastName(text)}
                />
              </View>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Enter Nickname..."
                placeholderTextColor="#000000"
                onChangeText={(text) => setSignNickname(text)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                keyboardType="phone-pad"
                style={styles.inputText}
                placeholder="Enter Phone number..."
                placeholderTextColor="#000000"
                onChangeText={(text) => setSignPhone(text)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                keyboardType="email-address"
                style={styles.inputText}
                placeholder="Enter Email..."
                placeholderTextColor="#000000"
                onChangeText={(text) => setSignupmail(text)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder="Enter Password..."
                placeholderTextColor="#000000"
                onChangeText={(text) => setsignpass(text)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                secureTextEntry
                style={styles.inputText}
                placeholder="Confirm Password..."
                placeholderTextColor="#000000"
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
        </View>
        {/* </KeyboardAvoidingView> */}
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
    width: "100%",
  },

  safeAreaView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flname: {
    marginTop: 20,
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },

  logo_reg: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#000000",
  },
  loginBtn: {
    width: 200,
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
  flview: {
    width: "45%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    height: 40,

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
    width: 250,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
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

  loginText: {
    color: "black",
    fontSize: 18,
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
  btnContainer: {
    position: "absolute",
    right: "10%",
    top: "5%",
    alignItems: "center",
    borderRadius: 800,
  },
});
export default RegisterModal;
