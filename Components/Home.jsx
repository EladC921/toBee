import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";

const toDoList = [
  {
    id: 1,
    title: "Learn React Native 1",
    completed: false,
    text: "Learn React Native Now",
  },
  {
    id: 2,
    title: "Learn React Native 2",
    completed: false,
    text: "Learn React Native Now!",
  },
  {
    id: 3,
    title: "Learn React Native 3",
    completed: false,
    text: "Learn React Native Now!!",
  },
  {
    id: 4,
    title: "Learn React Native 4",
    completed: false,
    text: "Learn React Native Now!!!",
  },
];

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ color: "#fff", fontSize: 20 }}>Welcome toBee!</Text>
      </View>
      <FlatList
        horizontal
        data={toDoList}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list_container}
        renderItem={({ item }) => (
          <View style={styles.list_item}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <FlatList
        horizontal
        data={toDoList}
        contentContainerStyle={styles.list_container}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.list_item}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </View>
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
    flex: 0.8,
    backgroundColor: "#00bfff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  list_container: {
    justifyContent: "center",
    alignItems: "center",
  },

  list_item: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    padding: 5,
    backgroundColor: "gray",
    height: 150,
    borderRadius: 40,
  },
});

export default Home;
