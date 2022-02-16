import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { useState } from "react";
import { Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";

const NewTaskModal = (props) => {
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
    console.log(props.gid);
    if (!validate()) return;
    let task = {
      Title,
      Txt,
      DueDate,
      Creator: {
        Uid: props.uid,
      },
      Gid: props.gid,
    };
    postTask(task);
    setModal(false);
  };

  return (
    <View>
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
              <View style={styles.dateArea}>
                <Text style={styles.inputLabel}>Due to:</Text>
                <View
                  style={{
                    width: "100%",
                  }}
                >
                  <DateTimePicker
                    style={{
                      width: "100%",
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
  dateArea: {
    flexDirection: "row",
    width: "70%",
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
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    position: "absolute",
    bottom: 50,
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
export default NewTaskModal;
