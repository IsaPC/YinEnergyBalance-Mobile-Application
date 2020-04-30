import React, { useState, useContext } from 'react';
import {StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';

// import custom components
import EventItem from './Components/eventItem';

import DateTimePicker from '@react-native-community/datetimepicker';


// moment allows the formatting of date
import moment from 'moment';

// import context
    import {CalendarContext} from '../contexts/CalendarContext';

const CalendarScreen = props => {
    
    const { addEvent, events } = useContext(CalendarContext);

    /// ---creating date--- ///
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [color, setColor] = useState();

    const [titleValue, setTitleValue] = useState('');

    const [display, setDisplay] = useState('default');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;

        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };


    const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
    };


    const showDatepicker = () => {
    showMode('date');
    setDisplay('default');
    };


    const showTimepicker = () => {
    showMode('time');
    };

    const saveEventHandler = () => {
        addEvent(titleValue, date);   
    };  

    const titleChangeHandler = titletext => {
        setTitleValue(titletext);
    }
    /// ---list event--- ///


 return (  
    <View style={styles.screen}>
        
        <View style={styles.datesContainer}>
            <View style={styles.setTimes}>

                <View style={styles.button}>
                    <Button 
                        testID="datePickerButton"
                        onPress={showDatepicker}
                        title="Select Date"
                    />
                </View>

                <View style={styles.button}>
                    <Button 
                        testID="timePickerButton"
                        onPress={showTimepicker}
                        title="Select Time"
                    />
                </View>
            </View>


            <View style={styles.containTitle}>
                <TextInput
                        placeholder='Input title' 
                        placeholderTextColor="grey"
                        // style={styles.titleinput}
                        onChangeText={titleChangeHandler} 
                        value={titleValue}
                    />
            </View>


                <View style={styles.containShowDate}>
                    <Text style={{paddingHorizontal: 5}}>Date: {moment(date).format('DD/MM/YYYY')}</Text>
                    <Text style={{paddingHorizontal: 5}}>Time: {moment(date).format('HH:mm')}</Text>
                </View>

                <View style={styles.saveButton}>
                    <Button 
                        title="Save"
                        onPress={saveEventHandler}
                    />
                </View>
        </View>


        {show && (
        <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour
            display={display}
            onChange={onChange}
            style={styles.iOsPicker}
            textColor={color || undefined}
        />
        )}

        <FlatList
            data={events}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <EventItem 
                title={itemData.item.title}
                date={itemData.item.date}
                />
            )}
        />
    </View>

 );
};

const styles =StyleSheet.create({
screen: {
    flex: 1,
    padding: 30,
    alignSelf: 'center',
},
datesContainer: {
    borderColor: 'black',
    borderWidth: 1.
},
setTimes: {
    flexDirection: "row",
    justifyContent: 'space-between', 
    padding: 15,
},
    button: {
        width: '40%',
        height: 40
    },
containTitle: {
    alignSelf: 'center'
},
containShowDate: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    flexDirection: 'row',
    padding: 15,
},
saveButton: {
    padding: 10,
    margin: 3,
},
});

export default CalendarScreen;