import {
  View,
  Pressable,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
} from "react-native";
import { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import Message from "./Message";

const PopupChat = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setinputText] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [chatTopMargin, setchatTopMargin] = useState("30%");

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
        setchatTopMargin("5%");
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        setchatTopMargin("30%");
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const sendMsg = () => {};

  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity activeOpacity={0.5} style={styles.chatBTN}>
        <Icon
          name="chatbubble-outline"
          type="ionicon"
          color="#000000"
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
        <View style={[styles.modalView, { top: chatTopMargin }]}>
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
                color="#000000"
                iconStyle={{ fontWeight: "1600" }}
              />
            </Pressable>
          </View>
          <View style={styles.chatContent}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={{ flex: 1 }}>
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
                  color="#000000"
                  iconStyle={{ fontWeight: "1600" }}
                />
              </Pressable>
            </View>
          </View>
        </View>
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
    backgroundColor: "#FCA311",
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
    backgroundColor: "#FCA311",
    width: "100%",
    alignItems: "flex-end",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  chatContent: {
    flex: 9,
    backgroundColor: "#FFFFFF",
    width: "100%",
  },
  chatfooter: {
    flex: 2,
    backgroundColor: "#FCA311",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  centeredView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    flex: 0.6,
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
    width: "100%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
});
export default PopupChat;
