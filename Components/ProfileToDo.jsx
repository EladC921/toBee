import { StyleSheet, View, Text, FlatList } from "react-native";
import React from "react";
import Task from "./Tasks/Task";
import NewTaskModal from "./NewTaskModal";

const ProfileToDo = (props) => {
  const completeTask = (tasks) => {
    props.setTasks(tasks);
  };

  return (
    <View style={{ flex: 1, width: "100%", borderRadius: 20 }}>
      {props.toDoList.length > 0 ? (
        <FlatList
          keyExtractor={(item) => item.Tid}
          data={props.toDoList}
          renderItem={({ item }) => {
            return (
              <View style={{ width: "97%", padding: 5 }}>
                <Task
                  tid={item.Tid}
                  title={item.Title}
                  text={item.Txt}
                  createdAt={item.CreatedAt}
                  Uid={props.Uid}
                  completeTask={completeTask}
                />
              </View>
            );
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>There are no tasks yet</Text>
        </View>
      )}
      <NewTaskModal gid={-1} uid={props.Uid} setTasks={props.setTasks} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.55,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    top: "20%",
    bottom: "10%",
    width: "100%",
  },
  modalView: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  btnContainer: {
    position: "absolute",
    right: "2%",
    top: "5%",
    alignItems: "center",
    borderRadius: 800,
  },

  modalHeader: {
    flex: 1,
    backgroundColor: "#E3E3E3",
    width: "100%",
    minWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: "black",
  },

  modalContent: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minWidth: "100%",
  },

  inputArea: {
    flexDirection: "column",
    width: "100%",
    minWidth: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    margin: 10,
    marginLeft: 20,
  },
  dateArea: {
    flexDirection: "row",
    width: "70%",
    alignItems: "flex-start",
    justifyContent: "center",
    margin: 10,
    marginLeft: 20,
  },
  modalInput: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    width: "80%",
    minWidth: "80%",

    marginLeft: 10,
    padding: 5,
  },

  inputLabel: {
    fontSize: 16,
    fontWeight: "700",
    margin: 10,
    color: "#4a4b4d",
  },

  modalFooter: {
    flex: 2,
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  addTask: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4a4b4d",
  },

  NewTaskBTN: {
    backgroundColor: "#FFCB2D",
    padding: 8,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    position: "relative",
    top: -10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  addBtn: {
    backgroundColor: "#FFCB2D",
    borderRadius: 20,
    padding: 15,
  },

  closeBtn: {
    borderRadius: 20,
    padding: 2,
    elevation: 2,
  },
});

export default ProfileToDo;
