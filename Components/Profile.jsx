import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  Modal,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import ProfileToDo from "./ProfileToDo";
import { Ionicons } from "@expo/vector-icons";

let user = {
  id: 1,
  name: "Jimmy Newton",
  nickname: "JimmyNewton_012",
  email: "jimmy_jim@gmail.com",
};

const Profile = () => {
  const [modal, setModal] = useState(false);
  const [nickname, setNickname] = useState(user.nickname);
  const [nicknameEdit, setNicknameEdit] = useState(false);
  const [name, setName] = useState(user.name);
  const [nameEdit, setNameEdit] = useState(false);
  const [edit_apply_name, toggle_edit_apply_name] = useState("create-outline");
  const [edit_apply_nickname, toggle_edit_apply_nickname] =
    useState("create-outline");

  return (
    <>
      <View style={styles.container}>
        {/** Header */}
        <View style={styles.header}>
          <Text style={styles.header_Text}> @{user.nickname} </Text>
        </View>
        {/** Body */}
        <View style={styles.body_container}>
          {/** Profile Data */}
          <View style={styles.profile_data_container}>
            {/** Profile Picutre */}
            <View style={styles.profilePic_container}>
              <Image
                source={require("../Images/bee.png")}
                style={styles.profilePic}
              />
              <View style={styles.cameraBtn}>
                <TouchableOpacity>
                  <Ionicons name="camera" />
                </TouchableOpacity>
              </View>
            </View>
            {/** Profile Name */}
            <View style={styles.profileName_container}>
              <Text> {user.name} </Text>
              <Button title="Edit Profile" onPress={() => setModal(true)} />
            </View>
          </View>
          {/** My - ToDo */}
          <View style={{ height: "70%", backgroundColor: "#fff" }}>
            <ProfileToDo />
          </View>
        </View>
      </View>
      {/** Modal - add new task */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(!modal);
        }}
      >
        <SafeAreaView
          style={{
            backgroundColor: "#fff",
            flex: 1,
            height: "100%",
          }}
        >
          <View style={styles.modalView}>
            <View style={{ position: "absolute", left: 5, top: 5 }}>
              <Button
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModal(!modal)}
                title="Back to Profile"
              />
            </View>
            <View style={styles.modalInputArea}>
              <Text style={styles.modalText}>Name: </Text>
              <TextInput
                style={styles.modalInput}
                editable={nameEdit}
                value={name}
                onChange={(e) => setName(e.nativeEvent.text)}
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 10 }}
                onPress={() => {
                  setNameEdit(true);
                  setName("");
                }}
              >
                <Ionicons name={edit_apply_name} style={{ fontSize: 20 }} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalInputArea}>
              <Text style={styles.modalText}>Nickname: </Text>
              <TextInput
                style={styles.modalInput}
                editable={nicknameEdit}
                value={nickname}
                onChange={(e) => setNickname(e.nativeEvent.text)}
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 10 }}
                onPress={() => {
                  setNicknameEdit(true);
                  setNickname("");
                }}
              >
                <Ionicons name={edit_apply_nickname} style={{ fontSize: 20 }} />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModal(false)}
              >
                <Text>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },

  header: {
    backgroundColor: "black",
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  header_Text: {
    top: "10%",
    color: "white",
    fontSize: 20,
  },

  body_container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },

  profile_data_container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    height: "25%",
    backgroundColor: "rgba(52, 52, 52, 0.2)",
  },

  profilePic: {
    resizeMode: "contain",
    height: 100,
    width: 100,
    borderWidth: 5,
    borderColor: "black",
    borderRadius: 50,
  },

  cameraBtn: {
    position: "absolute",
    right: 1,
    bottom: 3,
    padding: 5,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.95)",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.6,
  },

  profilePic_container: {
    margin: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },

  profileName_container: {
    height: 100,
    justifyContent: "center",
    margin: 20,
  },

  // Modal
  modalView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  modalInputArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    height: 50,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    borderWidth: 1,
  },

  modalText: {
    fontSize: 20,
    margin: 10,
  },

  modalInput: {
    width: "80%",
    height: "100%",
    color: "gray",
  },

  modalButton: {
    width: "80%",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff",
  },

  buttonClose: {
    backgroundColor: "red",
  },
});

export default Profile;
