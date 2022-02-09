import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import Task from "./Tasks/Task";
import GroupTask from "./Tasks/GroupTask";

let toDoList = [
  {
    id: 0,
    gid: 1,
    tid: 1,
    groupName: "Ruppin Computer Science",
    title: "Learn React Native 1",
    completed: false,
    text: "Learn React Native Now",
    createdAt: new Date(),
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
  },
  {
    id: 3,
    gid: 3,
    tid: 4,
    groupName: "Cohen Fam",
    title: "Learn React Native 4",
    completed: false,
    text: "Learn React Native Now!!!",
    createdAt: new Date(),
  },
];

let colors = [
  "rgba(106, 242, 167, 0.5)",
  "rgba(251, 255, 68, 0.5)",
  "rgba(107, 240, 255, 0.5)",
  "rgba(247, 98, 232, 0.5)",
  "rgba(255, 25, 25, 0.5)",
  "rgba(79, 255, 87, 0.5)",
  "rgba(249, 167, 67, 0.5)",
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: "black", fontSize: 20 }}>Welcome toBee!</Text>
      </View>
      {/** Registerable Tasks */}
      <View style={{ flex: 3 }}>
        <Text style={{ position: "absolute", top: 0, left: 5 }}>
          Registerable Tasks
        </Text>
        <FlatList
          horizontal
          data={toDoList}
          contentContainerStyle={styles.list_container}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Task
              title={item.title}
              text={item.text}
              createdAt={item.createdAt}
            />
          )}
        />
      </View>

      {/** My Tasks */}
      <View style={{ flex: 4 }}>
        <Text style={{ position: "absolute", top: 50, left: 5 }}>My Tasks</Text>
        <FlatList
          horizontal
          data={toDoList}
          contentContainerStyle={styles.list_container}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <GroupTask
              color={getColor(item.gid)}
              groupName={item.groupName}
              title={item.title}
              text={item.text}
              createdAt={item.createdAt}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  list_container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
