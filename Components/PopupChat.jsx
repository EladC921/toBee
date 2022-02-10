import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Icon } from "react-native-elements";

const PopupChat = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
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
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.chatHeader}>
            <Pressable
              style={[styles.button]}
              onPress={() => {
                setModalVisible(!modalVisible);
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
            <Text>jbjkbkjb</Text>
          </View>
          <View style={styles.chatfooter}>
            <Text>jbjkbkjb</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: "#14213D",
    width: "100%",
  },
  chatfooter: {
    flex: 2,
    backgroundColor: "#FCA311",
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
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
});
export default PopupChat;
