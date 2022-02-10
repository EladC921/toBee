import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import React from "react";
import Task from "./Tasks/Task";
import { useState } from "react";
import { Icon } from "react-native-elements";

let toDoList = [
  {
    id: 3,
    gid: -1,
    tid: 4,
    groupName: "",
    title: "Learn React Native 4",
    completed: false,
    text: "Learn React Native Now!!!",
    createdAt: new Date(),
    dueDate: new Date(2022, 8, 30, 12, 0, 0, 0),
  },
  {
    id: 2,
    gid: -1,
    tid: 3,
    groupName: "",
    title: "Learn React Native 3",
    completed: false,
    text: "Learn React Native Now!!",
    createdAt: new Date(),
    dueDate: new Date(2022, 5, 30, 12, 0, 0, 0),
  },
  {
    id: 0,
    gid: -1,
    tid: 1,
    groupName: "",
    title: "Make a Modal",
    completed: false,
    text: "Make a modal on the Register Page.",
    createdAt: new Date(),
    dueDate: new Date(2022, 12, 30, 12, 0, 0, 0),
  },
  {
    id: 1,
    gid: -1,
    tid: 2,
    groupName: "",
    title: "Learn React Native 2",
    completed: false,
    text: "Learn React Native Now!",
    createdAt: new Date(),
    dueDate: new Date(2022, 12, 30, 12, 0, 0, 0),
  },
  {
    id: 3,
    gid: -1,
    tid: 4,
    groupName: "",
    title: "Learn React Native 4",
    completed: false,
    text: "Learn React Native Now!!!",
    createdAt: new Date(),
    dueDate: new Date(2022, 8, 30, 12, 0, 0, 0),
  },
  {
    id: 2,
    gid: -1,
    tid: 3,
    groupName: "",
    title: "Learn React Native 3",
    completed: false,
    text: "Learn React Native Now!!",
    createdAt: new Date(),
    dueDate: new Date(2022, 5, 30, 12, 0, 0, 0),
  },
  {
    id: 0,
    gid: -1,
    tid: 1,
    groupName: "",
    title: "Make a Modal",
    completed: false,
    text: "Make a modal on the Register Page.",
    createdAt: new Date(),
    dueDate: new Date(2022, 12, 30, 12, 0, 0, 0),
  },
  {
    id: 1,
    gid: -1,
    tid: 2,
    groupName: "",
    title: "Learn React Native 2",
    completed: false,
    text: "Learn React Native Now!",
    createdAt: new Date(),
    dueDate: new Date(2022, 12, 30, 12, 0, 0, 0),
  },
];

const ProfileToDo = () => {
  const [modal, setModal] = useState(false);

  return (
    <View>
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "700" }}>My to-do List</Text>
      </View>
      <View style={{ height: "92%", width: "100%" }}>
        <FlatList
          data={[...toDoList, { addTask: true }]}
          contentContainerStyle={styles.list_container}
          showsHorizontalScrollIndicator={false}
          numColumns={3}
          renderItem={({ item }) => {
            if (item.addTask) {
              return (
                <TouchableOpacity onPress={() => setModal(true)}>
                  <Task
                    title={""}
                    text={"Create New Task"}
                    createdAt={""}
                    create={true}
                  />
                </TouchableOpacity>
              );
            }
            return (
              <View style={{}}>
                <Task
                  title={item.title}
                  text={item.text}
                  createdAt={item.createdAt}
                />
              </View>
            );
          }}
        />
      </View>
      {/** Modal add Task*/}
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
          }}
        >
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Pressable
                style={[styles.button]}
                onPress={() => {
                  setModal(!modal);
                }}
              >
                <Icon
                  name="close-outline"
                  type="ionicon"
                  color="#000000"
                  iconStyle={{ fontWeight: "1600" }}
                />
              </Pressable>
            </View>
            <View style={styles.modalContent}>
              <Text>jbjkbkjb</Text>
            </View>
            <View style={styles.modalFooter}>
              <Text>jbjkbkjb</Text>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list_container: {},
});

export default ProfileToDo;
