import { StyleSheet, SafeAreaView, KeyboardAvoidingView, View, Text, TextInput, Modal, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";




const Login = ({ navigation }) => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <SafeAreaView style={styles.main}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image
              source={require('../image/logo.png')}
              style={{ width: 120, height: 120 }} />
          </View>
        </View>





        <View style={styles.container}>

          <TextInput style={styles.input}
            placeholder="Enter Email"
            type='email' />

          <TextInput style={styles.input}
            placeholder="Enter password"
            secureTextEntry />
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.lgn_btn}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setOpenModal(true)} style={styles.btn}>
              <Text style={styles.lgn_btn}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>
      {openModal && <Modal><View style={styles.modalPart}>
        <View style={styles.reg_logo}>
          <Image
            source={require('../image/logo.png')}
            style={{ width: 120, height: 120 }} />
        </View>


        <TextInput style={styles.input}
          placeholder="Enter Email"
          type='email' />

        <TextInput style={styles.input}
          placeholder="Enter password"
          secureTextEntry />
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.lgn_btn}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setOpenModal(false)} style={styles.btn}>
            <Text style={styles.lgn_btn}>Register</Text>
          </TouchableOpacity>
        </View>

      </View></Modal>}
    </>
  );
};

const styles = StyleSheet.create({

  main: {

    height: 200,
    width: "100%",
    flex: 1,
    backgroundColor: "gray"

  },
  header: {

    flex: 1,

  },
  container: {

    flex: 2,

    borderRadius: 30,
    alignItems: 'center',

    backgroundColor: "white",
    paddingHorizontal: 10
  },

  logo: {

    alignItems: 'center',
    height: '30%',
  },
  reg_logo: {

    alignItems: 'center',
    height: '30%',
  },

  input: {
    padding: 10,
    paddingHorizontal: 25,
    margin: 10,
    width: 300,
    backgroundColor: 'gray',
    borderRadius: 30,


  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",

  },

  btn: {
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 40,
    alignItems: 'center',
    backgroundColor: "black",
    width: 160,
    height: 40,
    marginTop: 34
  },
  lgn_btn: {
    paddingTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

  modalPart: {

    borderRadius: 30,
    alignItems: 'center',
    height: '100%',
    backgroundColor: "gray",
    paddingHorizontal: 10
  },
})

export default Login;
