import { StyleSheet, Pressable, Alert, SafeAreaView, KeyboardAvoidingView, View, Text, TextInput, Modal, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { auth } from '../db/firebaseSDK';
import RegisterModal from "./RegisterModal";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";





const Login = ({ navigation }) => {
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      
      .then(userCredentials => {
        
        navigation.navigate("Main");
        console.log('Logged in with:', user.email);
      })
      
      .catch(error => alert(error.message))
     
  }
  
  const [isSelected, setSelection] = useState(false)
  const [signmail, setSignupmail] = useState()
  const [csignpass, setcpass] = useState()
  const [signpass, setsignpass] = useState()
  const [password, setPassword] = useState()
  const [email, setEmail] = useState()
  const [openModal, setOpenModal] = useState(false)

  return (

    <>

      <View style={styles.container}>
      <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
        >
        <View style={styles.logophoto}>
          <Image
            source={require('../image/logo.png')}
            style={styles.images} />
        </View>
       
          <Text style={styles.logo}>toBee</Text>

          <View style={styles.inputView} >
            <TextInput

              style={styles.inputText}
              placeholder="Email..."
              placeholderTextColor="white"
              onChangeText={text => setEmail(text)} />
          </View>
          <View style={styles.inputView} >
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Password..."
              placeholderTextColor="white"
              onChangeText={text => setPassword(text)} />
          </View>

          <TouchableOpacity onPress={() => { handleLogin() }} style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
        <CheckBox
          disabled={false}
          value={isSelected}
          onValueChange={(newValue) => setSelection(newValue)}
          />
          <RegisterModal />
        </KeyboardAvoidingView>
      </View>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE889',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  images: {
    marginBottom: 40,
    width: 160,
    height: 185
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#B35A3F",
    marginBottom: 40
  },
  logo_reg: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#B35A3F",
    marginBottom: 10
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  inputText: {
    height: 50,
    color: "white"
  },

  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "50%",
    backgroundColor: "#B35A3F",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  loginText: {
    color: "white"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
 
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
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
    textAlign: "center"
  },
 
})

export default Login;
