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
  Button,
} from "react-native";
import React from "react";
import Task from "./Tasks/Task";
import { useState } from "react";
import { Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";

// let toDoList = [
//   {
//     id: 11,
//     gid: -1,
//     tid: 4,
//     groupName: "",
//     title: "Learn React Native 4",
//     completed: false,
//     text: "Learn React Native Now!!!",
//     createdAt: new Date(),
//     dueDate: new Date(2022, 8, 30, 12, 0, 0, 0),
//   },
//   {
//     id: 10,
//     gid: -1,
//     tid: 3,
//     groupName: "",
//     title: "Learn React Native 3",
//     completed: false,
//     text: "Learn React Native Now!!",
//     createdAt: new Date(),
//     dueDate: new Date(2022, 5, 30, 12, 0, 0, 0),
//   },
//   {
//     id: 9,
//     gid: -1,
//     tid: 1,
//     groupName: "",
//     title: "Make a Modal",
//     completed: false,
//     text: "Make a modal on the Register Page.",
//     createdAt: new Date(),
//     dueDate: new Date(2022, 12, 30, 12, 0, 0, 0),
//   },
//   {
//     id: 6,
//     gid: -1,
//     tid: 2,
//     groupName: "",
//     title: "Learn React Native 2",
//     completed: false,
//     text: "Learn React Native Now!",
//     createdAt: new Date(),
//     dueDate: new Date(2022, 12, 30, 12, 0, 0, 0),
//   },
//   {
//     id: 3,
//     gid: -1,
//     tid: 4,
//     groupName: "",
//     title: "Learn React Native 4",
//     completed: false,
//     text: "Learn React Native Now!!!",
//     createdAt: new Date(),
//     dueDate: new Date(2022, 8, 30, 12, 0, 0, 0),
//   },
//   {
//     id: 2,
//     gid: -1,
//     tid: 3,
//     groupName: "",
//     title: "Learn React Native 3",
//     completed: false,
//     text: "Learn React Native Now!!",
//     createdAt: new Date(),
//     dueDate: new Date(2022, 5, 30, 12, 0, 0, 0),
//   },
//   {
//     id: 0,
//     gid: -1,
//     tid: 1,
//     groupName: "",
//     title: "Make a Modal",
//     completed: false,
//     text: "Make a modal on the Register Page.",
//     createdAt: new Date(),
//     dueDate: new Date(2022, 12, 30, 12, 0, 0, 0),
//   },
//   {
//     id: 1,
//     gid: -1,
//     tid: 2,
//     groupName: "",
//     title: "Learn React Native 2",
//     completed: false,
//     text: "Learn React Native Now!",
//     createdAt: new Date(),
//     dueDate: new Date(2022, 12, 30, 12, 0, 0, 0),
//   },
// ];

const ProfileToDo = (props) => {
  const [modal, setModal] = useState(false);
  const [DueDate, setDueDate] = useState(new Date());
  const [Txt, setTxt] = useState();
  const [Title, setTitle] = useState();

  // handle due date onchange
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDueDate(currentDate);
  };

  // form validation
  const validate = () => {
    if (!Txt || !Title) {
      alert("Please fill all the fields");
      return false;
    }

    if (Title.length > 30) {
      alert("Title is too long");
      return false;
    }

    let today = new Date();
    if (today > DueDate) {
      alert("Due date is in the future");
      return false;
    }

    return true;
  };

  // post task to DB
  const postTask = (newTask) => {
    let apiUrl_PostProfileTask =
      "https://proj.ruppin.ac.il/bgroup68/test2/tar5/api/Tasks";
    fetch(apiUrl_PostProfileTask, {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("POST User request:\n");
        console.log("supposed to be=", newTask);
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          props.setTasks(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  };

  // add new profile task
  const addTask = () => {
    if (!validate()) return;
    let task = {
      Title,
      Txt,
      DueDate,
      Creator: {
        Uid: props.Uid,
      },
      Gid: -1,
    };
    postTask(task);
    setModal(false);
  };

  return (
    <View style={{ flex: 1, width: "100%", borderRadius: 20 }}>
      {props.toDoList.length > 0 ? (
        <FlatList
          keyExtractor={(item) => item.Tid}
          data={props.toDoList}
          renderItem={({ item }) => {
            return (
              <View style={{ width: "97%", padding: 5 }}>
                <Task
                  title={item.Title}
                  text={item.Txt}
                  createdAt={item.CreatedAt}
                />
              </View>
            );
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>There are no tasks yet</Text>
        </View>
      )}
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
              {/** Inputs Area */}
              <View style={styles.modalContent}>
                <View style={styles.inputArea}>
                  <Text style={styles.inputLabel}>Title:</Text>
                  <TextInput
                    style={[styles.modalInput, { height: 40 }]}
                    value={Title}
                    onChange={(e) => setTitle(e.nativeEvent.text)}
                  />
                </View>
                <View style={styles.inputArea}>
                  <Text style={styles.inputLabel}>Task:</Text>
                  <TextInput
                    style={[styles.modalInput, { height: 40 }]}
                    value={Txt}
                    onChange={(e) => setTxt(e.nativeEvent.text)}
                  />
                </View>
                <View style={styles.inputArea}>
                  <Text style={styles.inputLabel}>Due to:</Text>
                  <View>
                    <DateTimePicker
                      style={{
                        position: "absolute",
                        width: "100%",
                        left: 10,
                        backgroundColor: "#fff",
                      }}
                      testID="dateTimePicker"
                      value={DueDate}
                      mode={"datetime"}
                      is24Hour={true}
                      display="default"
                      themeVariant="light"
                      onChange={onChangeDate}
                    />
                  </View>
                </View>
              </View>
              {/** Buttons Area */}
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => {
                    addTask(); //add new task
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
