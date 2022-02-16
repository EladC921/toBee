import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Icon } from "react-native-elements";
import React from "react";
import { useEffect, useState } from "react";

import GroupTask from "./Tasks/GroupTask";
import PopupChat from "./PopupChat";
import MembersModal from "./MembersModal";
import NewTaskModal from "./NewTaskModal";

const Group = ({ navigation, route }) => {
  const { gid, currentUser } = route.params;
  const [taskPickerVal, settaskPickerVal] = useState("select");
  const [tasksList, settasksList] = useState([]);
  const [myTasksList, setmyTasksList] = useState([]);
  const [regiterabletasksList, setRegiterabletasksList] = useState([]);
  const [pickerTasksList, setPickerTasksList] = useState([]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [groupData, setGroupData] = useState({
    name: "",
    description: "",
    imgUrl:
      "https://4.bp.blogspot.com/-OCutvC4wPps/XfNnRz5PvhI/AAAAAAAAEfo/qJ8P1sqLWesMdOSiEoUH85s3hs_vn97HACLcBGAsYHQ/s1600/no-image-found-360x260.png",
    members: [],
  });

  const taskType = [
    { label: "All tasks", value: "Alltasks" },
    { label: "My tasks", value: "Mytasks" },
    { label: "Regiterable tasks", value: "Regiterabletasks" },
  ];

  //render the tasks if select changes
  useEffect(() => {
    setTasksStates();
  }, [value]);

  const setTasksStates = () => {
    if (value === "Mytasks") {
      setPickerTasksList(myTasksList);
    } else if (value === "Regiterabletasks") {
      setPickerTasksList(regiterabletasksList);
    } else setPickerTasksList(tasksList);
  };

  const filterTasksList = (result) => {
    settasksList([]);
    result.map((t) => {
      if (!t.Completed) {
        settasksList((prev) => [...prev, t]);
      }
    });
    setTasksStates();
  };

  //when taskslist change update the other lists
  useEffect(() => {
    setmyTasksList([]);
    setRegiterabletasksList([]);
    tasksList.map((t) => {
      if (t.RegTo != null) {
        if (t.RegTo.some((i) => i.Uid === currentUser.Uid)) {
          setmyTasksList((prev) => [...prev, t]);
        }
        if (t.RegTo.length === 0) {
          setRegiterabletasksList((prev) => [...prev, t]);
        }
      }
    });
  }, [tasksList]);

  //at first load get group info and tasks
  const apiUrl = "https://proj.ruppin.ac.il/bgroup68/test2/tar5/api/";
  const api_GetTasksOfGroup = apiUrl + "Tasks/GetTasksOfGroup?gid=" + gid;
  const api_GetGroup = apiUrl + "Groups?gid=" + gid;

  useEffect(() => {
    fetch(api_GetTasksOfGroup, {
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
          filterTasksList(result);
        },
        (error) => {
          console.log("err GET=", error);
        }
      );
    fetch(api_GetGroup, {
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
          setGroupData((prev) => ({
            ...prev,
            name: result.Name,
            description: result.Description,
            imgUrl: result.ImgURL,
            members: result.Members,
          }));
        },
        (error) => {
          console.log("err GET=", error);
        }
      );
  }, []);

  const renderItem = ({ item: t }) => {
    let status = "regAble";
    if (t.RegTo.some((i) => i.Uid === currentUser.Uid)) {
      status = "registered";
    }
    let regto =
      t.RegTo.length === 0
        ? "Nobody"
        : t.RegTo[0].FirstName + " " + t.RegTo[0].LastName;
    return (
      <View style={{ margin: 5 }}>
        <GroupTask
          color="#E5E5E5"
          groupName={t.GName}
          title={t.Title}
          text={t.Txt}
          createdAt={t.CreatedAt}
          dueDate={t.DueDate}
          creator={t.Creator.FirstName + " " + t.Creator.LastName}
          creatorId={t.Creator.Uid}
          regTo={regto}
          status={status}
          tid={t.Tid}
          gid={gid}
          uid={currentUser.Uid}
          setTasks={filterTasksList}
        />
      </View>
    );
  };

  const leaveGroup = () => {
    Alert.alert("Are you sure you want to leave this group?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: removeUserFromGroup },
    ]);
  };

  const removeUserFromGroup = () => {
    let apiUrl_DeleteUserfromGroup =
      "https://proj.ruppin.ac.il/bgroup68/test2/tar5/api/Groups?gid=" +
      gid +
      "&uid=" +
      currentUser.Uid;
    fetch(apiUrl_DeleteUserfromGroup, {
      method: "DELETE",
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        console.log("DELETE User request:\n");
        console.log("res=", res);
        return res.json();
      })
      .then(
        (result) => {
          console.log("fetch POST= ", result);
          props.setTasks(result);
          alert("You left the group successfully");
          navigation.navigate("Login");
        },
        (error) => {
          alert("err");
          console.log("err post=", error);
          navigation.navigate("Home", {
            navigation: navigation,
            currentUser: currentUser,
          });
        }
      );
  };

  return (
    <View style={styles.groupsPageContainer}>
      <SafeAreaView style={styles.groupHeaderContainer}>
        <View style={styles.leftHeader}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.leaveGroupBtn}
            onPress={leaveGroup}
          >
            <Text style={styles.leaveGroupTxt}>Leave group</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightHeader}>
          <MembersModal members={groupData.members} gid={gid} />
        </View>
      </SafeAreaView>
      <SafeAreaView style={[styles.groupInfoContainer, styles.shaddow]}>
        <View style={styles.infoLeftContainer}>
          <Image
            style={styles.groupImg}
            source={{
              uri: groupData.imgUrl,
            }}
          />
        </View>
        <View style={styles.infoRightContainer}>
          <Text style={styles.groupNameTxt}>{groupData.name}</Text>
          <Text style={styles.groupDescriptionTxt}>
            {groupData.description}
          </Text>
          <Text style={[styles.groupDescriptionTxt, { marginTop: 9 }]}>
            <Text style={{ fontWeight: "600" }}>Members: </Text>
            {groupData.members.map((i) => i.FirstName + ", ")}
          </Text>
        </View>
      </SafeAreaView>
      <SafeAreaView style={[styles.groupTaskContainer, styles.shaddow]}>
        <View style={[styles.dropdownContainer, styles.shaddow]}>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={[styles.placeholderStyle]}
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
        </View>

        <View style={styles.tasksContainer}>
          <FlatList
            data={pickerTasksList}
            keyExtractor={(t) => t.Tid}
            renderItem={renderItem}
          />
        </View>
      </SafeAreaView>
      <NewTaskModal
        gid={gid}
        uid={currentUser.Uid}
        setTasks={filterTasksList}
      />
      <PopupChat gid={gid} user={currentUser} />
    </View>
  );
};
const styles = StyleSheet.create({
  shaddow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  groupsPageContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  groupHeaderContainer: {
    flex: 2.2,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#FFCB2D",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  groupInfoContainer: {
    flex: 2,
    position: "relative",
    bottom: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
    backgroundColor: "#FFFFFF",
    width: "85%",
    borderRadius: 20,
  },
  groupTaskContainer: {
    flex: 6.5,
    position: "relative",
    bottom: 70,
    borderRadius: 20,
    width: "95%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  leftHeader: {
    flex: 6,
    paddingTop: 10,
    paddingLeft: 20,
  },
  rightHeader: {
    paddingTop: 10,
    paddingRight: 10,
    flex: 1,
  },
  infoLeftContainer: {
    flex: 3,
    height: "70%",
    justifyContent: "center",
  },
  infoRightContainer: {
    flex: 5,
    height: "70%",
  },
  pickerContainer: {
    flex: 1,
  },
  dropdownContainer: {
    position: "relative",
    top: -10,
    borderRadius: 20,
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFCB2D",
    width: "70%",
  },
  tasksContainer: {
    flex: 15,
    marginTop: 30,
    width: "100%",
  },
  groupImg: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginLeft: 17,
  },
  groupNameTxt: {
    color: "#676767",
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "600",
  },
  groupDescriptionTxt: {
    color: "#7D7C7A",
  },
  dropdown: {
    width: "80%",
    height: 50,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  groupScreanNameTxt: {
    color: "#7D7C7A",
    fontSize: 17,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  selectedTextStyle: {
    color: "#676767",
    fontWeight: "600",
  },
  leaveGroupBtn: {
    backgroundColor: "red",
    width: 100,
    alignItems: "center",
    borderRadius: 20,
  },
  leaveGroupTxt: {
    padding: 5,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
export default Group;
