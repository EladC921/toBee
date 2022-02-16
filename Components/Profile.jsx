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
import { useState, useEffect } from "react";
import ProfileToDo from "./ProfileToDo";
import { Ionicons } from "@expo/vector-icons";
import ChangeProfilePic from "./ChangeProfilePic";
import { useIsFocused } from "@react-navigation/native";

const Profile = (props) => {
  const [user, setUser] = useState(props.user);
  console.log(props.user);
  const [tasks, setTasks] = useState([]);
  const [modalPic, setModalPic] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    getUser();
    getTasks();
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  const filterTasksList = (result) => {
    setTasks([]);
    result.map((t) => {
      if (!t.Completed) {
        setTasks((prev) => [...prev, t]);
      }
    });
  };

  const getUser = () => {
    //update user
    let api_getUser =
      "https://proj.ruppin.ac.il/bgroup68/test2/tar5/api/Users?uid=" + user.Uid;
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
          setUser(result);
        },
        (error) => {
          console.log("err GET=", error);
        }
      );
  };
  const getTasks = () => {
    let api_getProfileTasks =
      "https://proj.ruppin.ac.il/bgroup68/test2/tar5/api/Tasks/GetProfileTasksOfUser?uid=" +
      user.Uid;

    fetch(api_getProfileTasks, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch getTasks= ", result);
          result.map((r) => console.log(r.Title));
          filterTasksList(result);
        },
        (error) => {
          console.log("err GET=", error);
        }
      );
  };

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
          <ProfileToDo
            toDoList={tasks}
            setTasks={filterTasksList}
            Uid={user.Uid}
          />
        </View>
      </View>
      <ChangeProfilePic
        modalPic={modalPic}
        setModalPic={setModalPic}
        goToCamera={() =>
          props.navigation.navigate("CameraComp", { Uid: user.Uid })
        }
        goToGallery={() =>
          props.navigation.navigate("GalleryComp", { Uid: user.Uid })
        }
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

  buttonClose: {
    backgroundColor: "red",
  },
});

export default Profile;
