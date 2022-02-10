import { StyleSheet, Pressable, Alert, SafeAreaView, KeyboardAvoidingView, View, Text, TextInput, Modal, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { auth } from '../db/firebaseSDK';




const Login = ({ navigation }) => {
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user; 
        console.log('Logged in with:', user.email);
        
      })
      .catch(error => alert(error.message))
  }
  const handleSignUp = () => {
   
    auth
      .createUserWithEmailAndPassword(signmail, csignpass)
      .then (userCredentials => {
        const user = userCredentials.user;
        setOpenModal(false)
        console.log(user.email);
        
      })
      .catch(error => alert(error.message))
  }
  const [signmail, setSignupmail] = useState()
  const [csignpass, setcpass] = useState()
  const [signpass, setsignpass ] = useState()
  const [password, setPassword] = useState()
  const [email, setEmail] = useState()
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
       <View style={styles.container}>
         
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
            onChangeText={text => setEmail(text)}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="white"
            onChangeText={text => setPassword(text)}/>
        </View>
        
        <TouchableOpacity onPress={()=> {handleLogin()}} style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOpenModal(true)}>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity> 
        {openModal&&
    <View style={styles.centeredView}>
    <Modal
      animationType="slide"
      transparent={true}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
        <TouchableOpacity style={styles.xbut} onPress={() => setOpenModal(false)}>
          <Text>X</Text>
        </TouchableOpacity>
        <Text style={styles.logo_reg}>Register</Text>
        <View style={styles.inputView} >
          <TextInput  
          
            style={styles.inputText}
            placeholder="Enter Full Name..." 
            placeholderTextColor="white"
           />
        </View>
        <View style={styles.inputView} >
          <TextInput  
          
            style={styles.inputText}
            placeholder="Enter Nickname..." 
            placeholderTextColor="white"
            />
        </View>
        <View style={styles.inputView} >
          <TextInput  
          
            style={styles.inputText}
            placeholder="Enter Email..." 
            placeholderTextColor="white"
            onChangeText={text => setSignupmail(text)}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Enter Password..." 
            placeholderTextColor="white"
            onChangeText={text => setsignpass(text)}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Confirm Password..." 
            placeholderTextColor="white"
            onChangeText={text => setcpass(text)}/>
        </View>
        <TouchableOpacity onPress={()=> {handleSignUp()}}  style={styles.loginBtn}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
        </View>
      </View>
    </Modal>
    </View>
   }
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
  },
  images:{
    marginBottom:40,
    width:160,
    height:185
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#B35A3F",
    marginBottom:40
  },
  logo_reg:{
    fontWeight:"bold",
    fontSize:50,
    color:"#B35A3F",
    marginBottom:10
  },
  inputView:{
    width:"80%",
    backgroundColor:"#B35A3F",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  inputText:{
    height:50,
    color:"white"
  },
  
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"50%",
    backgroundColor:"#B35A3F",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  loginText:{
    color:"white"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    height:'70%',
    width:'100%',
    margin: 20,
    flex:1,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  xbut:{
    borderWidth:2,
    backgroundColor:'#B35A3F',
    borderColor:'#B35A3F',
    borderRadius:10,
    alignItems:'center',
    paddingTop:5,
    height:30,
    width:30,
    marginRight:340,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
    

  }
})

export default Login;
