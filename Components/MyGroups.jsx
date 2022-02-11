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
      <View style={{ flex: 1 }}>
        <TouchableOpacity activeOpacity={0.5} style={styles.createBtn}>
          <Text>Creat new group</Text>
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
  header: {
    flex: 1,
    width: "100%",
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  groupsListContainer: {
    flex: 5,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  hederTxt: {
    marginTop: 50,
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: "AppleSDGothicNeo-Bold",
  },
  createBtn: {
    backgroundColor: "#FCA311",
    padding: 20,
    borderRadius: 20,
  },
});

export default MyGroups;
