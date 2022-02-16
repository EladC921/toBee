import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Linking,
  Share,
} from "react-native";
import { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import InviteToGroupBTN from "./InviteToGroupBTN";
import MemberListItem from "./MemberListItem";

const renderItem = ({ item: t }) => (
  <View
    style={{
      margin: 5,
      width: "95%",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <MemberListItem
      nickName={t.Nickname}
      name={t.FirstName + " " + t.LastName}
      imgUrl={t.ImgURL}
    />
  </View>
);

const MembersModal = (props) => {
  console.log(props);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.addMember}
        onPress={() => setModalVisible(true)}
      >
        <Icon
          name="person-add-outline"
          type="ionicon"
          color="#7D7C7A"
          iconStyle={{ fontWeight: "1600" }}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modelHeader}>
            <View>
              <Text>Members</Text>
            </View>
            <View>
              <Pressable
                style={[styles.button]}
                onPress={() => {
                  setModalVisible(!modalVisible);
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
          </View>
          <View style={styles.membersContainer}>
            <FlatList
              keyExtractor={(t) => t.Uid}
              data={props.members}
              renderItem={renderItem}
            />
          </View>
          <View style={styles.modelFooter}>
            <InviteToGroupBTN />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 0.5,
    marginTop: 80,
    marginHorizontal: 40,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modelHeader: {
    flex: 1,
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  membersContainer: {
    flex: 5,
    width: "100%",
    alignItems: "center",
  },
  modelFooter: { flex: 1, width: "100%", alignItems: "center" },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#25D366",
  },
  inviteBtn: {
    backgroundColor: "#25D366",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default MembersModal;
