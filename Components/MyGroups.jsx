import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Linking,
} from "react-native";
import GroupCard from "./GroupCard";
import { useEffect, useState } from "react";

const MyGroups = (props) => {
  const [groupsList, setGroupsList] = useState([]);
  const currentUser = props.user;

  const apiUrl = "https://proj.ruppin.ac.il/bgroup68/test2/tar5/api/";
  const api_getGroupsOfUser =
    apiUrl + "Groups/GetGroupsOfUser?uid=" + currentUser.Uid;

  useEffect(() => {
    fetch(api_getGroupsOfUser, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch getTasks= ", result);
          setGroupsList(result);
          result.map((r) => console.log(r.Tid));
        },
        (error) => {
          console.log("err GET=", error);
        }
      );
  }, []);

  const renderItem = ({ item: t }) => {
    let membersList = [];
    t.Members === null
      ? (membersList = ["Nobody"])
      : t.Members.map((i) => {
          membersList.append(i.FirstName);
        });
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          props.navigation.navigate("GroupPage", {
            gid: t.Gid,
            currentUser: currentUser,
          })
        }
      >
        <GroupCard
          groupName={t.Name}
          imgUrl={t.ImgURL}
          description={t.Description}
          currentUser={currentUser}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerbackground}></View>
      <View style={styles.header}>
        <Text style={styles.hederTxt}>My Groups</Text>
      </View>
      <View style={styles.groupsListContainer}>
        <FlatList
          keyExtractor={(t) => t.Gid}
          data={groupsList}
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
