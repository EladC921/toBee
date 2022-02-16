import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Icon } from "react-native-elements";
import Message from "./Message";
import { db } from "../db/firebaseSDK";
import Moment from "moment";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const PopupChat = (props) => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setinputText] = useState("");
  const [messageList, setMessageList] = useState([])
  const [firstMessage, setFirstMessage] = useState(false);



  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);



  const groupId = "group" + props.gid

 

  useLayoutEffect(() => {
    const unsubscribed = db.collection(groupId).
      orderBy('createdAt', 'desc').onSnapshot
      (snapshot => setMessageList(
        snapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt,
          text: doc.data().text,
          user: doc.data().user
        }))

      ))
    setFirstMessage(true)
  }, [])

  useEffect(() => {
    
      if (firstMessage === true) {
        let lastElement = messageList.slice(-1)

        if (lastElement[0]._id !== props.user.Uid) {
          schedulePushNotification()
        }
      }
    
  }, [messageList]);

  const renderItem = ({ item: t }) => (
    <View style={{ flex: 13 }}>
      <Message
        isReader={true}
        userName={t.user}
        text={t.text}
        dateTime={t.createdAt}
      ></Message>
    </View>
  );
  
  const sendMsg = () => {
    db.collection(groupId).add({
      _id: props.user.Uid,
      createdAt: Moment()
        .utcOffset('+05:30')
        .format('YYYY-MM-DD hh:mm:ss a'),
      text: inputText,
      user: props.user.Nickname
      
    })
    setinputText("")
  };

  const clearText= () =>{
  
  }

  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity activeOpacity={0.5} style={styles.chatBTN}>
        <Icon
          name="chatbubble-outline"
          type="ionicon"
          color="#676767"
          iconStyle={{ fontWeight: "1600" }}
          onPress={() => setModalVisible(true)}
        />
      </TouchableOpacity>

      <Modal
        avoidKeyboard={true}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <KeyboardAvoidingView behavior="position" style={styles.container}>
          <View style={[styles.modalView]}>
            <View style={styles.chatHeader}>
              <Pressable
                style={[styles.button]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setinputText("");
                }}
              >
                <Icon
                  name="close-outline"
                  type="ionicon"
                  color="#686868"
                  iconStyle={{ fontWeight: "1600" }}
                />
              </Pressable>
            </View>
            <View style={styles.chatContent}>
              <FlatList
                keyExtractor={(t) => t.Mid}
                data={messageList}
                renderItem={renderItem}
                inverted={true}
              />
            </View>
            <View style={styles.chatfooter}>
              <View style={{ flex: 4 }}>
                <TextInput
                  multiline={true}
                  style={styles.input}
                  onChangeText={(t) => setinputText(t)}
                  value={inputText}
                  
                />
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                activeOpacity={0.5}
                 style={[styles.button]} 
                 onPress={sendMsg}
                 
                 >
                  <Icon
                    name="send-outline"
                    type="ionicon"
                    color="#686868"
                    iconStyle={{ fontWeight: "1600" }}
                  />
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};
async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got a Message! 📬",
      body: 'go and check the chat in the group page',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
const styles = StyleSheet.create({
  row: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
  },

  btnContainer: {
    backgroundColor: "#FFCB2D",
    position: "absolute",
    left: "7%",
    top: "90%",
    alignItems: "center",
    borderRadius: 800,
  },
  chatBTN: {
    width: 65,
    height: 65,
    alignItems: "center",
    justifyContent: "center",
  },
  chatHeader: {
    flex: 1,
    backgroundColor: "#E3E3E3",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    minWidth: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  chatContent: {
    flex: 7,
    backgroundColor: "#FFFFFF",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  chatfooter: {
    flex: 1,
    backgroundColor: "#E3E3E3",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  container: {
    flex: 0.55,
    borderRadius: 20,
    alignItems: "center",
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    maxHeight: 300,
    minHeight: 30,
    
    fontSize: 18,
    width: "100%",
    margin: 12,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
});
export default PopupChat;
