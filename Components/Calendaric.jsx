import { View, time, Text, StyleSheet, timeToString, TouchableOpacity} from "react-native";
import React, { useState,useEffect } from "react";
import { Calendar, CalendarList, Agenda, calendarTheme } from "react-native-calendars";
import Moment from "moment";

/**test */
const Calendaric = (props) => {
 
  const [userEvents,setUserEvents]= useState();
  useEffect(() => {
    console.log("laalalalallalalalal");
    const api_User ="https://proj.ruppin.ac.il/bgroup68/test2/tar5/api/Tasks/GetTasksOfRegUserInAllGroups?uid="+props.user.Uid
    fetch(api_User, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => { 
                 
          let dates = [...new Set(result.map((t) => t.DueDate))];

          let events = {};

       
          dates.map((d) => {
            let tmpDateVars = result.filter((t) => {
              return t.DueDate === d;
            });
            events[d] = [...tmpDateVars];
          });

          for (var key in events) {
            let updatedKey = Moment(key).format("YYYY-MM-DD");
            Object.defineProperty(
              events,
              updatedKey,
              Object.getOwnPropertyDescriptor(events, key)
            );
            delete events[key];
          }

          setUserEvents(events);

          
          
        },
        (error) => {
          alert("err GET=", error);
        }
      )},[]);
     
      
      



  // const [monthData, loadingData] = getMonthData()
  
  const renderItem = (item) => {
  
    console.log(item)
  
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text style={{fontWeight:"bold"}}>{item.Title}</Text>
        <Text style={{fontWeight:"bold",fontSize:12,color:"#5e5b51"}}>{item.GName}</Text>
        <Text style={{fontSize:12,color:"gray"}}>{item.Txt}</Text>
        </View>
    );
  }

  const getCurrentDate = () => {

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

   

    return + (year + '-' + month + '-' + day).toString;//format: dd-mm-yyyy;
  }

  return (
    <View style={styles.page}>

      <View style={styles.container}>

        <Agenda


          items={userEvents}
          renderItem={(item) => { return (renderItem(item)) }}
          
          onDayChange={getCurrentDate}
          renderEmptyData={() => {
            return ( <View style={styles.emptyDate}>
              <View style={styles.blank}>
                <Text style={{paddingTop:50,fontWeight:"bold",fontSize:18,alignItems:"center"}}>No tasks for this day!</Text>
                </View></View>);
          }}
          theme={{

            ...calendarTheme,
            agendaDayTextColor: 'black',
            agendaDayNumColor: 'green',
            agendaTodayColor: 'red',
            agendaKnobColor: 'blue',
            backgroundColor: '#d3d8e0',
            calendarBackground: '#f8f5f0',
            
            selectedDayBackgroundColor: '#E0D2BC',
            selectedDayTextColor: 'black',
            todayTextColor: 'black',
            textDisabledColor: '#888888',
            dayTextColor: 'black',
            agendaKnobColor: '#DCDCDC',
            dotColor: "green",
            selectedDotColor: "black",
            'stylesheet.calendar.header': { week: { marginTop: Platform.OS == 'ios' ? 6 : 2, flexDirection: 'row', justifyContent: 'space-between' } }
          }}
         
          showClosingKnob='true'
          // Agenda container style
          style={{ borderRadius: 20}}
        />
      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  page: {
    flex: 1
  },
  container: {

    backgroundColor: 'white',
    height: '100%',
    flex: 1,
    paddingTop: 100,
    height: '80%',
    width: '100%',


  },
  cal: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,


  },

  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    borderColor: "black",
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  blank: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    alignItems:"center",
    
    
    borderRadius:20,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
})
export default Calendaric;
