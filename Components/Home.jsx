import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Task from "./Tasks/Task";
import GroupTask from "./Tasks/GroupTask";
import GroupsTask from "./Tasks/GroupsTask";
import { useEffect, useState } from "react";

let colors = [
  "#277da1",
  "#577590",
  "#4d908e",
  "#43aa8b",
  "#90be6d",
  "#f9c74f",
  "#f9844a",
  "#f8961e",
  "#f3722c",
  "#f94144",
];
let toDoList = [];
// generate random color for list item
const getRandomColor = () => {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
};

const Home = (props) => {
  const currentUserEmail = props.userEmail;

  const [myTaskList, setMyTaskList] = useState([]);
  const [regableTasksList, setRegableTasksList] = useState([]);
  let toDoListGids = [];

  const setRandomColorToGroups = () => {
    let tmpList = [...MyTaskList, ...regableTasksList];
    toDoListGids = [...new Set(tmpList.map((item) => item.gid))];
    toDoListGids = toDoListGids.map((item) => {
      let color = getRandomColor();
      colors = colors.filter((c) => c !== color);
      return { gid: item, color: color };
    });
  };
  const getColor = (gid) => {
    let color = "";
    toDoListGids.map((item) => {
      if (item.gid === gid) {
        color = item.color;
      }
    });
    return color;
  };
  const renderItem = ({ item: t }) => {
    let regToList =
      t.RegTo === null ? "Nobody" : t.RegTo.map((i) => i.FirstName + ", ");
    return (
      <View style={{ margin: 10, marginTop: 30, marginBottom: 30, width: 300 }}>
        <GroupsTask
          color={getColor(t.Gid)}
          groupName={t.GName}
          title={t.Title}
          text={t.Txt}
          createdAt={t.CreatedAt}
          dueDate={t.DueDate}
          creator={t.Creator.FirstName}
          registered={regToList}
        />
      </View>
    );
  };

  const apiUrl = "https://proj.ruppin.ac.il/bgroup68/test2/tar5/api/";
  const api_getMyTasks = apiUrl + "Tasks/GetTasksOfRegUserInAllGroups?uid=9";
  const api_getRegisterableTasks =
    apiUrl + "Tasks/GetAvailableTasksInAllGroups?uid=9";
  useEffect(() => {
    fetch(api_getMyTasks, {
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
          setMyTaskList(result);
          result.map((r) => console.log(r.Tid));
        },
        (error) => {
          console.log("err GET=", error);
        }
      );
    fetch(api_getRegisterableTasks, {
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
          setRegableTasksList(result);
          setRandomColorToGroups();
          result.map((r) => console.log(r.Tid));
        },
        (error) => {
          console.log("err GET=", error);
        }
      );
  }, []);
  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerbackground}></View>
      <View style={styles.header}>
        <Text style={styles.hederTxt}>Welcome</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.TaskContainers}>
          <Text style={styles.taskHeader}> My Tasks</Text>
          <View style={styles.tasksListContainer}>
            <FlatList
              keyExtractor={(t) => t.Tid}
              horizontal
              data={myTaskList}
              contentContainerStyle={styles.list_container}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
          </View>
        </View>
        <View style={styles.TaskContainers}>
          <Text style={styles.taskHeader}> Registerable Tasks</Text>
          <View style={styles.tasksListContainer}>
            <FlatList
              keyExtractor={(t) => t.Tid}
              horizontal
              data={regableTasksList}
              contentContainerStyle={styles.list_container}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
            />
          </View>
        </View>
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
  contentContainer: {
    flex: 7,
    width: "100%",
    flexDirection: "column",
    marginBottom: 10,
  },
  TaskContainers: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  hederTxt: {
    margin: 15,
    color: "#686868",
    fontSize: 18,
    fontWeight: "600",
  },
  taskHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#676767",
  },
  tasksListContainer: {
    flex: 1,
    width: "100%",
  },
});

export default Home;
