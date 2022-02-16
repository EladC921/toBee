import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

const GroupCard = (props) => {
  return (
    <View style={[styles.cardContainer]}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          style={{ width: 70, height: 70, borderRadius: 50 }}
          source={{
            uri: props.imgUrl,
          }}
        />
      </View>
      <View style={{ flex: 2.5 }}>
        <Text style={styles.groupNameTxt}>{props.groupName}</Text>
        <Text style={styles.descriptionTxt}>{props.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    backgroundColor: "#FFFFFF",
    minWidth: 350,
    maxHeight: 120,
    height: 120,
    borderRadius: 20,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  groupNameTxt: {
    fontSize: 22,
    padding: 10,
    fontWeight: "600",
    color: "#333333",
  },
  descriptionTxt: {
    fontSize: 15,
    padding: 10,
    paddingTop: 0,
    color: "#686868",
  },
  membersListTxt: {
    fontSize: 12,
    padding: 10,
    paddingTop: 0,
    color: "#686868",
  },
});

export default GroupCard;
