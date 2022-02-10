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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: "black", fontSize: 20 }}>Welcome toBee!</Text>
      </View>
      {/** Registerable Tasks */}
      <View style={{ flex: 2 }}>
        <Text style={{ position: "absolute", top: 0, left: 5 }}>
          Registerable Tasks
        </Text>
        <FlatList
          keyExtractor={(item) => item.id}
          horizontal
          data={toDoList2}
          contentContainerStyle={styles.list_container}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <GroupsTask
              color={getColor(item.gid)}
              groupName={item.groupName}
              title={item.title}
              text={item.text}
              createdAt={item.createdAt}
              dueDate={item.dueDate}
            />
          )}
        />
      </View>
      {/** My Tasks */}
      <View style={{ flex: 2 }}>
        <Text style={{ alignSelf: "flex-start", marginLeft: 5 }}>My Tasks</Text>
        <FlatList
          keyExtractor={(item) => item.id}
          horizontal
          data={toDoList}
          contentContainerStyle={styles.list_container}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <GroupsTask
              color={getColor(item.gid)}
              groupName={item.groupName}
              title={item.title}
              text={item.text}
              createdAt={item.createdAt}
              dueDate={item.dueDate}
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
    marginTop: 5,
  },
});

export default Home;
