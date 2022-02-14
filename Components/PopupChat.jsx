import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import Message from "./Message";

const PopupChat = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setinputText] = useState("");

  const sendMsg = () => {};

  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity activeOpacity={0.5} style={styles.chatBTN}>
        <Icon
          name="chatbubble-outline"
          type="ionicon"
          color="#676767"
          iconStyle={{ fontWeight: "1600" }}
          onPress={() => setModalVisible(true)}
        />
      </TouchableOpacity>

      <Modal
        avoidKeyboard={true}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <KeyboardAvoidingView behavior="position" style={styles.container}>
          <View style={[styles.modalView]}>
            <View style={styles.chatHeader}>
              <Pressable
                style={[styles.button]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setinputText("");
                }}
              >
                <Icon
                  name="close-outline"
                  type="ionicon"
                  color="#686868"
                  iconStyle={{ fontWeight: "1600" }}
                />
              </Pressable>
            </View>
            <View style={styles.chatContent}>
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 13 }}>
                  <Message
                    isReader={true}
                    userName={"nofar"}
                    text={"hayy bb bjbcjb bb bcjvj"}
                    dateTime={"02/02/22 15:26"}
                  ></Message>
                </View>
              </ScrollView>
            </View>
            <View style={styles.chatfooter}>
              <View style={{ flex: 4 }}>
                <TextInput
                  multiline
                  style={styles.input}
                  onChangeText={(t) => setinputText(t)}
                  value={inputText}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Pressable style={[styles.button]} onPress={sendMsg}>
                  <Icon
                    name="send-outline"
                    type="ionicon"
                    color="#686868"
                    iconStyle={{ fontWeight: "1600" }}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
  },

  btnContainer: {
    backgroundColor: "#FFCB2D",
    position: "absolute",
    left: "7%",
    top: "90%",
    alignItems: "center",
    borderRadius: 800,
  },
  chatBTN: {
    width: 65,
    height: 65,
    alignItems: "center",
    justifyContent: "center",
  },
  chatHeader: {
    flex: 1,
    backgroundColor: "#E3E3E3",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    minWidth: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  chatContent: {
    flex: 7,
    backgroundColor: "#FFFFFF",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  chatfooter: {
    flex: 1,
    backgroundColor: "#E3E3E3",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  container: {
    flex: 0.55,
    borderRadius: 20,
    alignItems: "center",
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    maxHeight: 300,
    fontSize: 18,
    width: "100%",
    margin: 12,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
});
export default PopupChat;
