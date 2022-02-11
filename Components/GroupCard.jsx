import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

const GroupCard = (props) => {
  const tempMembersList = props.memberList.slice(0, 5);
  return (
    <View style={[styles.cardContainer]}>
      <View style={[styles.headerContainer, styles.fullWidthCentred]}>
        <Text>{props.groupName}</Text>
      </View>
      <View style={[styles.groupContentContainer, styles.fullWidthCentred]}>
        <View style={[styles.fullWidthCentred, { flex: 1 }]}>
          <Image
            style={{ width: 65, height: 65 }}
            source={{
              uri: props.imgUrl,
            }}
          />
        </View>
        <View
          style={[
            styles.fullWidthCentred,
            { flex: 2, flexDirection: "column" },
          ]}
        >
          <View style={[styles.fullWidthCentred, { flex: 4 }]}>
            <Text>{props.description}</Text>
          </View>
          <View style={{ flex: "1" }}>
            <Text>{tempMembersList}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullWidthCentred: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  cardContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "95%",
    backgroundColor: "lightgray",
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
  headerContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "lightgray",
  },
  groupContentContainer: {
    flex: 4,
    backgroundColor: "white",
    flexDirection: "row",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default GroupCard;
