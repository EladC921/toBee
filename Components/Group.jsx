import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { Icon } from "react-native-elements";

import React from "react";
import GroupTask from "./Tasks/GroupTask";
import PopupChat from "./PopupChat";

const Group = () => {
  const tempTasks = [
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

  const [taskPickerVal, settaskPickerVal] = useState("All tasks");
  const [tasksList, settasksList] = useState(tempTasks);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const taskType = [
    { label: "All tasks", value: "Alltasks" },
    { label: "My tasks", value: "Mytasks" },
    { label: "Regiterable tasks", value: "Regiterabletasks" },
  ];

  const renderItem = ({ item: t }) => (
    <GroupTask
      color="#E5E5E5"
      groupName={t.groupName}
      title={t.title}
      text={t.text}
      createdAt={t.createdAt}
      dueDate={t.dueDate}
    />
  );
  return (
    <View style={styles.groupsPageContainer}>
      <SafeAreaView style={styles.groupHeaderContainer}>
        <View style={styles.leftHeader}>
          <Text style={styles.groupScreanNameTxt}>@groupScreenName</Text>
        </View>
        <View style={styles.rightHeader}>
          <TouchableOpacity activeOpacity={0.5} style={styles.addMember}>
            <Icon
              name="person-add-outline"
              type="ionicon"
              color="#FFFFFF"
              iconStyle={{ fontWeight: "1600" }}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.groupInfoContainer}>
        <View style={styles.infoLeftContainer}>
          <Image
            style={styles.groupImg}
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
          />
        </View>
        <View style={styles.infoRightContainer}>
          <Text style={styles.groupNameTxt}>GroupName</Text>
          <Text style={styles.groupDescriptionTxt}>
            description description description description description
            description description
          </Text>
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.groupTaskContainer}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={taskType}
          maxHeight={170}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? taskPickerVal : "select"}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
        <View style={styles.tasksContainer}>
          <FlatList
            keyExtractor={(t) => t.id}
            data={tasksList}
            horizontal
            renderItem={renderItem}
          />
        </View>
      </SafeAreaView>
      <PopupChat />
    </View>
  );
};
const styles = StyleSheet.create({
  groupsPageContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  groupHeaderContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  groupInfoContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: "#FCA311",
    width: "100%",
  },
  groupTaskContainer: {
    flex: 6.5,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  leftHeader: {
    flex: 6,
  },
  rightHeader: {
    flex: 1,
  },
  infoLeftContainer: {
    flex: 3,
    height: "70%",
  },
  infoRightContainer: {
    flex: 5,
    height: "70%",
  },
  pickerContainer: {
    flex: 1,
  },
  tasksContainer: {
    flex: 15,
    marginTop: 30,
    width: "100%",
  },
  groupImg: {
    width: 90,
    height: 90,
    marginLeft: 17,
  },
  groupNameTxt: {
    marginBottom: 5,
    fontSize: 20,
  },
  groupDescriptionTxt: {},
  dropdown: {
    width: "80%",
    height: 50,
    paddingHorizontal: 8,
  },

  groupScreanNameTxt: {
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: "AppleSDGothicNeo-Bold",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
export default Group;
