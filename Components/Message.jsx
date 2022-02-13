import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";

const Message = (props) => {
  return (
    <View
      style={[
        styles.msgContainer,
        props.isReader ? styles.readerMsg : styles.otherMsg,
      ]}
    >
      <View style={styles.msgHeader}>
        <Text style={styles.userNameTxt}>{props.userName}</Text>
      </View>
      <View style={styles.msgContent}>
        <Text style={styles.messageTxt}>{props.text}</Text>
      </View>
      <View style={styles.msgFooter}>
        <Text style={styles.timeTxt}>{props.dateTime}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  msgContainer: {
    margin: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  readerMsg: {
    backgroundColor: "#FFFFFF",
  },
  otherMsg: { backgroundColor: "#E5E5E5" },
  userNameTxt: {
    fontSize: 15,
    fontWeight: "600",
    color: "#14213D",
  },
  messageTxt: {
    fontWeight: "500",
  },
  timeTxt: {
    fontSize: 10,
    color: "#6C757D",
  },
  msgHeader: {
    margin: 2,
  },
  msgContent: {
    marginLeft: 5,
    marginBottom: 13,
  },
  msgFooter: {
    margin: 3,
    alignItems: "flex-end",
  },
});
export default Message;
