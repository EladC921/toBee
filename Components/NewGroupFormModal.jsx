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

const NewGroupFormModal = (props) => {
  const [modal, setModal] = useState(false);
  const [description, setDescription] = useState();
  const [groupName, setGroupName] = useState();

  const createGroup = () => {
    if (!validate()) return;
    let group = {
      Name: groupName,
      Description: description,
      ImgURL:
        "https://he.cecollaboratory.com/public/layouts/images/group-default-logo.png",
      CreatorID: props.uid,
    };
    postGroup(group);
  };

  const postTask = (group) => {
    let apiUrl_PostProfileTask =
      "https://proj.ruppin.ac.il/bgroup68/test2/tar5/api/Groups";
    fetch(apiUrl_PostProfileTask, {
      method: "POST",
      body: JSON.stringify(group),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("POST User request:\n");
        console.log("supposed to be=", group);
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

  // form validation
  const validate = () => {
    if (!description || !groupName) {
      alert("Please fill all the fields");
      return false;
    }

    if (groupName.length > 30) {
      alert("Title is too long");
      return false;
    }
    return true;
  };

  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.createBtn}
          onPress={() => {
            setModal(true);
          }}
        >
          <Text style={styles.createBtnTxt}>Create new group</Text>
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
                Create New group
              </Text>
            </View>
            {/** Inputs Area */}
            <View style={styles.modalContent}>
              <View style={styles.inputArea}>
                <Text style={styles.inputLabel}>Group Name:</Text>
                <TextInput
                  style={[styles.modalInput, { height: 40 }]}
                  value={groupName}
                  onChange={(e) => setGroupName(e.nativeEvent.text)}
                />
              </View>
              <View style={styles.inputArea}>
                <Text style={styles.inputLabel}>Decription:</Text>
                <TextInput
                  style={[styles.modalInput, { height: 100 }]}
                  value={description}
                  onChange={(e) => setDescription(e.nativeEvent.text)}
                />
              </View>
            </View>
            {/** Buttons Area */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => {
                  createGroup(); //add new task
                }}
              >
                <Text style={styles.addTask}>Create group</Text>
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

  createBtn: {
    backgroundColor: "#FFCB2D",
    width: "100%",
    borderRadius: 20,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 12,
    paddingBottom: 12,
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
export default NewGroupFormModal;
