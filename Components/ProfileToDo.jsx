import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import Task from "./Tasks/Task";
import { useState } from "react";
import { Icon } from "react-native-elements";

let toDoList = [
  {
    id: 3,
    gid: -1,
    tid: 4,
    groupName: "",
    title: "Learn React Native 4",
    completed: false,
    text: "Learn React Native Now!!!",
    createdAt: new Date(),
    dueDate: new Date(2022, 8, 30, 12, 0, 0, 0),
  },
  {
    id: 2,
    gid: -1,
    tid: 3,
    groupName: "",
    title: "Learn React Native 3",
    completed: false,
    text: "Learn React Native Now!!",
    createdAt: new Date(),
    dueDate: new Date(2022, 5, 30, 12, 0, 0, 0),
  },
  {
    id: 0,
    gid: -1,
    tid: 1,
    groupName: "",
    title: "Make a Modal",
    completed: false,
    text: "Make a modal on the Register Page.",
    createdAt: new Date(),
    dueDate: new Date(2022, 12, 30, 12, 0, 0, 0),
  },
  {
    id: 1,
    gid: -1,
    tid: 2,
    groupName: "",
    title: "Learn React Native 2",
    completed: false,
    text: "Learn React Native Now!",
    createdAt: new Date(),
    dueDate: new Date(2022, 12, 30, 12, 0, 0, 0),
  },
  {
    id: 3,
    gid: -1,
    tid: 4,
    groupName: "",
    title: "Learn React Native 4",
    completed: false,
    text: "Learn React Native Now!!!",
    createdAt: new Date(),
    dueDate: new Date(2022, 8, 30, 12, 0, 0, 0),
  },
  {
    id: 2,
    gid: -1,
    tid: 3,
    groupName: "",
    title: "Learn React Native 3",
    completed: false,
    text: "Learn React Native Now!!",
    createdAt: new Date(),
    dueDate: new Date(2022, 5, 30, 12, 0, 0, 0),
  },
  {
    id: 0,
    gid: -1,
    tid: 1,
    groupName: "",
    title: "Make a Modal",
    completed: false,
    text: "Make a modal on the Register Page.",
    createdAt: new Date(),
    dueDate: new Date(2022, 12, 30, 12, 0, 0, 0),
  },
  {
    id: 1,
    gid: -1,
    tid: 2,
    groupName: "",
    title: "Learn React Native 2",
    completed: false,
    text: "Learn React Native Now!",
    createdAt: new Date(),
    dueDate: new Date(2022, 12, 30, 12, 0, 0, 0),
  },
];

const ProfileToDo = () => {
  const [modal, setModal] = useState(false);

  return (
    <View style={{ flex: 1, width: "100%", borderRadius: 20 }}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={toDoList}
        renderItem={({ item }) => {
          return (
            <View style={{ width: "97%", padding: 5 }}>
              <Task
                title={item.title}
                text={item.text}
                createdAt={item.createdAt}
              />
            </View>
          );
        }}
      />
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={styles.NewTaskBTN}
          onPress={() => {
            setModal(true);
          }}
        >
          <Text>New Task</Text>
        </TouchableOpacity>
      </View>

      {/** Modal add Task*/}
      <View style={{ borderRadius: 20 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
          }}
        >
          <KeyboardAvoidingView behavior="position" style={styles.container}>
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
                <Text
                  style={{ fontSize: 16, fontWeight: "800", color: "#4a4b4d" }}
                >
                  Create New Task
                </Text>
              </View>
              <View style={styles.modalContent}>
                <View style={styles.inputArea}>
                  <Text style={styles.inputLabel}>Title:</Text>
                  <TextInput
                    style={[styles.modalInput, { height: 30 }]}
                    value={""}
                  />
                </View>
                <View style={styles.inputArea}>
                  <Text style={styles.inputLabel}>Task:</Text>
                  <TextInput
                    style={[styles.modalInput, { height: 70 }]}
                    multiline={true}
                    numberOfLines={3}
                  />
                </View>
              </View>
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => {
                    //add new task
                    setModal(false);
                  }}
                >
                  <Text style={styles.addTask}>Add Task</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.55,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    top: "20%",
    bottom: "10%",
    width: "100%",
  },
  modalView: {
    flex: 1,
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

  NewTaskBTN: {
    backgroundColor: "#FFCB2D",
    padding: 8,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    position: "relative",
    top: -10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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

export default ProfileToDo;
