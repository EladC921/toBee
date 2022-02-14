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

let toDoList = [
  {
    id: 3,
    gid: 3,
    tid: 4,
    groupName: "Cohen Fam",
    title: "Learn React Native 4",
    completed: false,
    text: "Learn React Native Now!!!",
    createdAt: new Date(),
    dueDate: new Date(2022, 8, 30, 12, 0, 0, 0),
  },
  {
    id: 2,
    gid: 2,
    tid: 3,
    groupName: "Future Factories",
    title: "Learn React Native 3",
    completed: false,
    text: "Learn React Native Now!!",
    createdAt: new Date(),
    dueDate: new Date(2022, 5, 30, 12, 0, 0, 0),
  },
  {
    id: 0,
    gid: 4,
    tid: 1,
    groupName: "Shustermen!",
    title: "Make a Modal",
    completed: false,
    text: "Make a modal on the Register Page.",
    createdAt: new Date(),
    dueDate: new Date(2022, 12, 30, 12, 0, 0, 0),
  },
  {
    id: 1,
    gid: 1,
    tid: 2,
    groupName: "Ruppin Computer Science",
    title: "Learn React Native 2",
    completed: false,
    text: "Learn React Native Now!",
    createdAt: new Date(),
    dueDate: new Date(2022, 12, 30, 12, 0, 0, 0),
  },
];

let toDoList2 = [
  {
    id: 3,
    gid: 4,
    tid: 4,
    groupName: "Shustermen!",
    title: "Getting ready to complexity",
    completed: false,
    text: "This is very complex and therefore very hard, but I'm ready!",
    createdAt: new Date(),
    dueDate: new Date(2022, 8, 30, 12, 0, 0, 0),
  },
  {
    id: 1,
    gid: 1,
    tid: 2,
    groupName: "Ruppin Computer Science",
    title: "Finish this App",
    completed: false,
    text: "Apply the Backend to the Frontend",
    createdAt: new Date(),
    dueDate: new Date(2022, 12, 30, 12, 0, 0, 0),
  },
  {
    id: 0,
    gid: 4,
    tid: 1,
    groupName: "Shustermen!",
    title: "Make a Modal",
    completed: false,
    text: "Make a modal on the Register Page.",
    createdAt: new Date(),
    dueDate: new Date(2022, 12, 30, 12, 0, 0, 0),
  },
];

let colors = [
  "rgba(106, 242, 167, 0.1)",
  "rgba(214, 214, 74, 0.1)",
  "rgba(107, 240, 255, 0.1)",
  "rgba(247, 98, 232, 0.1)",
  "rgba(255, 25, 25, 0.1)",
  "rgba(79, 255, 87, 0.1)",
  "rgba(249, 167, 67, 0.1)",
];

// generate random color for list item
const getRandomColor = () => {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
};

let toDoListGids = [...new Set(toDoList.map((item) => item.gid))];
toDoListGids = toDoListGids.map((item) => {
  let color = getRandomColor();
  colors = colors.filter((c) => c !== color);
  return { gid: item, color: color };
});

const getColor = (gid) => {
  let color = "";
  toDoListGids.map((item) => {
    if (item.gid === gid) {
      color = item.color;
    }
  });
  return color;
};

const Home = () => {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerbackground}></View>
      <View style={styles.header}>
        <Text style={styles.hederTxt}>Welcome</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.registerableTasksContainer}>
          <Text style={styles.taskHeader}> Registerable Tasks</Text>
        </View>
        <View style={styles.MyTaskContainer}>
          <Text style={styles.taskHeader}> Registerable Tasks</Text>
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
    alignItems: "center",
    borderWidth: 1,
  },

  hederTxt: {
    margin: 15,
    color: "#686868",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Home;
