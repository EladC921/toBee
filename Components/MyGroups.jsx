import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { useState } from "react";
import GroupCard from "./GroupCard";

const MyGroups = ({ navigation }) => {
  const renderItem = ({ item: t }) => (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => navigation.navigate("GroupPage")}
    >
      <GroupCard
        memberList={["Chen", "Elad", "Nofar"]}
        groupName={"tweetFluent"}
        imgUrl={"https://reactnative.dev/img/tiny_logo.png"}
        description={"nsknc csnjkjnc sbcjkbcsjk"}
      />
    </TouchableOpacity>
  );
  const tempGroupList = [{ id: 1 }, { id: 2 }];
  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerbackground}></View>
      <View style={styles.header}>
        <Text style={styles.hederTxt}>My Groups</Text>
      </View>
      <View style={styles.groupsListContainer}>
        <FlatList
          keyExtractor={(t) => t.id}
          data={tempGroupList}
          renderItem={renderItem}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TouchableOpacity activeOpacity={0.5} style={styles.createBtn}>
          <Text style={styles.createBtnTxt}>Create new group</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  headerbackground: {
    flex: 0.8,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#FFCB2D",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  header: {
    position: "relative",
    top: -30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    width: "65%",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  groupsListContainer: {
    flex: 5,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  hederTxt: {
    margin: 15,
    color: "#686868",
    fontSize: 18,
    fontWeight: "600",
  },
  createBtnTxt: {
    color: "#686868",
    fontSize: 15,
    fontWeight: "600",
  },
  createBtn: {
    backgroundColor: "#FFCB2D",
    width: "70%",
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
});

export default MyGroups;
