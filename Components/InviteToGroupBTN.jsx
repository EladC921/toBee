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
import React from "react";

const InviteToGroupBTN = (props) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const inviteMember = () => {
    alert("hayy");
  };
  return (
    <Pressable style={[styles.button, styles.inviteBtn]} onPress={onShare}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.textStyle}>Invite mamber </Text>
        <Icon
          name="logo-whatsapp"
          type="ionicon"
          color="#FFFFFF"
          iconStyle={{ fontWeight: "1600", marginLeft: 8 }}
        />
      </View>
    </Pressable>
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
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  membersContainer: {
    flex: 5,
    borderWidth: 1,
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

export default InviteToGroupBTN;
