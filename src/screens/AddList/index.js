import React, { useState } from 'react';
import {View, Text, TextInput, Pressable, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import SelectDropdown from 'react-native-select-dropdown';
import  DateTimePickerAndroid  from '@react-native-community/datetimepicker';


const database = require('../../components/handlers/database.js');


const AddListScreen = props => {

    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [store, setStore] = useState('');
    const [date, setDate] = useState(new Date());
    const [priority, setPriority] = useState('');
    const [datePicker, setDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const priorityNames = ['HIGH', 'LOW'];

    function showDatePicker(){
        setDatePicker(true);
    }

    function onDateSelected(event, value){
        setDate(value);
        setDatePicker(false);
        setSelectedDate(value.toLocaleDateString());
    }
    
    const onListAdd = () => {
        console.log(priority)
        if (!name)
        {
            alert('Please enter a shopping list name.');
            return;
        }
        if(!store)
        {
            alert('Please enter a shopping list store.');
            return;
        }
        if (!selectedDate)
        {
            alert('Please enter a shopping list date.');
            return;
        }
        if (!priority)
        {
            alert('Please enter a priority type as HIGH or LOW.');
            return;
        }

        try {
            database.addList(name,store,date.toLocaleDateString(),priority);
        } catch (error) {
            console.log('Error adding list ' + error);
        }
        alert(name + ' Added.')
        // navigation.navigate('Start Shopping!');

    }

  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <TextInput
                accessible={true}
                accessibilityLabel='Please enter a shopping list name'
                value={name}
                onChangeText={value => setName(value)}
                style={styles.name}
                // placeholder={'Enter Name'}
                placeholderTextColor={'grey'}
            />
            <TextInput
                value={store}
                onChangeText={value => setStore(value)}
                style={styles.name}
                placeholder={'Enter Store'}
                placeholderTextColor={'grey'}
            />
            <SelectDropdown
                data={priorityNames}
                defaultValue={priority}
                defaultButtonText={'Select Priority'}
                onSelect={(selectedItem, index) => {
                    setPriority(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                    return item;
                }}
                buttonStyle={styles.dropdownBtnStyle}
                buttonTextStyle={styles.dropdownBtnTxtStyle}
                dropdownStyle={styles.dropdownDropdownStyle}
                rowStyle={styles.dropdownRowStyle}
                rowTextStyle={styles.dropdownRowTxtStyle}      
            />
            {datePicker && (
                <DateTimePickerAndroid
                    value={date}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={onDateSelected}
                    minimumDate={new Date(Date.now())}
                    
                />

            )}
            {!datePicker && (
                <View>
                    <Pressable 
                    accessible={true}
                    accessibilityRole='button'
                    accessibilityLabel='Double tap to open date picker'
                    accessibilityHint='Opens date picker'
                    onPress={showDatePicker} 
                    style={styles.dateButton}>
                        <Text style={styles.dateButtonText}>Select a Date</Text>
                    </Pressable>
                </View>
            )}
            <TextInput
                value={selectedDate}
                style={styles.date}
                placeholder={'Selected Date'}
                editable={false}
            />
        </View>
        <View style={styles.bottomContainer}>
            <Pressable
                  accessible={true}
                  accessibilityRole='button'
                  accessibilityLabel='Double tap to add a list'
                  accessibilityHint='Adds a list' style={styles.button} onPress={onListAdd}>
            <Text style={styles.buttonText}>Add</Text>
            </Pressable>
        </View>
    </View>
  );
};

export default AddListScreen