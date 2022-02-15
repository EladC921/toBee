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
import ChangeProfilePic from "./ChangeProfilePic";

// let user = {
//   id: 1,
//   name: "Jimmy Newton",
//   nickname: "JimmyNewton_012",
//   email: "jimmy_jim@gmail.com",
// };

const Profile = (props) => {
  let user = props.user;
  console.log(props.user);
  const [modal, setModal] = useState(false);
  const [modalPic, setModalPic] = useState(false);
  const [nickname, setNickname] = useState(user.nickname);
  const [nicknameEdit, setNicknameEdit] = useState(false);
  const [name, setName] = useState(user.name);
  const [nameEdit, setNameEdit] = useState(false);
  const [edit_apply_name, toggle_edit_apply_name] = useState("create-outline");
  const [edit_apply_nickname, toggle_edit_apply_nickname] =
    useState("create-outline");

  return (
    <View style={styles.container}>
      {/** Header */}
      <View style={styles.header}></View>
      <View style={[styles.profile_data_container, styles.shaddow]}>
        {/** Profile Picutre */}
        <View style={styles.profilePic_container}>
          {user.ImgURL ? (
            <Image source={{ uri: user.ImgURL }} style={styles.profilePic} />
          ) : (
            <Image
              source={require("../Images/bee.png")}
              style={styles.profilePic}
            />
          )}
          <View style={styles.cameraBtn}>
            <TouchableOpacity onPress={() => setModalPic(true)}>
              <Ionicons name="camera" />
            </TouchableOpacity>
          </View>
        </View>
        {/** Profile Name */}
        <Text style={styles.nicknameTxt}> @{user.Nickname} </Text>
        <Text style={styles.nameTxt}>
          {user.FirstName} {user.LastName}
        </Text>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => setModal(true)}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: "#FFC30B",
              top: -10,
            }}
          >
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>
      {/** My - ToDo */}
      <View style={styles.myTodoHeader}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#676767",
          }}
        >
          My to-do List
        </Text>
      </View>
      <View style={styles.MyTodo_container}>
        <View style={styles.listContainer}>
          <ProfileToDo />
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
            <View style={{ position: "absolute", left: 10, top: 7 }}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => setModal(!modal)}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "700", color: "#FFC30B" }}
                >
                  Back to Profile
                </Text>
              </TouchableOpacity>
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
      <ChangeProfilePic
        modalPic={modalPic}
        setModalPic={setModalPic}
        goToCamera={() => props.navigation.navigate("CameraComp")}
        goToGallery={() => props.navigation.navigate("GalleryComp")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  shaddow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    flex: 2.2,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#FFCB2D",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  profile_data_container: {
    flex: 1,
    position: "relative",
    top: -30,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
    backgroundColor: "#FFFFFF",
    width: "85%",
    borderRadius: 20,
  },
  MyTodo_container: {
    flex: 6.5,
    marginBottom: 15,
    borderRadius: 20,
    width: "95%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  myTodoHeader: {
    flex: 0.5,
    top: -15,
    marginLeft: 15,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  profilePic: {
    resizeMode: "contain",
    height: 100,
    width: 100,
    borderWidth: 2,
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
    position: "relative",
    top: -30,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
  },
  listContainer: {
    flex: 10,
    width: "100%",
    padding: 5,
    paddingTop: 0,
    borderRadius: 20,
  },

  nicknameTxt: {
    position: "relative",
    top: -20,
    fontSize: 10,
  },

  nameTxt: {
    position: "relative",
    top: -10,
    color: "#676767",
    marginBottom: 5,
    fontSize: 22,
    fontWeight: "600",
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
