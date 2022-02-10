import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
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
    <View>
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "700" }}>My to-do List</Text>
      </View>
      <View style={{ height: "95%", width: "100%" }}>
        <FlatList
          data={[...toDoList, { addTask: true }]}
          contentContainerStyle={styles.list_container}
          showsHorizontalScrollIndicator={false}
          numColumns={3}
          renderItem={({ item }) => {
            if (item.addTask) {
              return (
                <TouchableOpacity onPress={() => setModal(true)}>
                  <Task
                    title={""}
                    text={"Create New Task"}
                    createdAt={""}
                    create={true}
                  />
                </TouchableOpacity>
              );
            }
            return (
              <View style={{}}>
                <Task
                  title={item.title}
                  text={item.text}
                  createdAt={item.createdAt}
                />
              </View>
            );
          }}
        />
      </View>
      {/** Modal add Task*/}
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
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
              <Text style={{ fontSize: 16, fontWeight: "800" }}>
                Create New Task
              </Text>
            </View>
            <View style={styles.modalContent}>
              <View style={styles.inputArea}>
                <Text style={styles.inputLabel}>Title:</Text>
                <TextInput style={styles.modalInput} value={""} />
              </View>
              <View style={styles.inputArea}>
                <Text style={styles.inputLabel}>Task:</Text>
                <TextInput
                  style={styles.modalInput}
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
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list_container: {},

  modalView: {
    flex: 0.6,
    margin: 20,
    top: "20%",
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
    backgroundColor: "#FCA311",
    position: "absolute",
    right: "2%",
    top: "5%",
    alignItems: "center",
    borderRadius: 800,
  },

  modalHeader: {
    flex: 1,
    backgroundColor: "#FCA311",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: "black",
    borderWidth: 1,
  },

  modalContent: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  inputArea: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },

  modalInput: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    width: "50%",
    height: 30,
    padding: 10,
    margin: 10,
  },

  inputLabel: {
    fontSize: 16,
    fontWeight: "700",
    margin: 10,
  },

  modalFooter: {
    flex: 2,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#FCA311",
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  addTask: {
    fontSize: 16,
    fontWeight: "600",
  },

  addBtn: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
  },

  closeBtn: {
    borderRadius: 20,
    padding: 2,
    elevation: 2,
  },
});

export default ProfileToDo;
