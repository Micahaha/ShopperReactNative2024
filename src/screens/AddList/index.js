import React, { useState } from 'react';
import {View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const database = require('../../components/handlers/database.js');


const AddListScreen = props => {

    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [store, setStore] = useState('');
    const [date, setDate] = useState('');
    const [priority, setPriority] = useState('');
    
    const onListAdd = () => {
        console.log(priority)
        if (!name)
        {
            alert('Please enter a shopping list name.');
            return;
        }
        if(!store)
        {
            alert('Please enter a shopping lis store.');
            return;
        }
        if (!date)
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
            database.addList(name,store,date,priority);
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
                value={name}
                onChangeText={value => setName(value)}
                style={styles.name}
                placeholder={'Enter Name'}
                placeholderTextColor={'grey'}
            />
            <TextInput
                value={store}
                onChangeText={value => setStore(value)}
                style={styles.name}
                placeholder={'Enter Store'}
                placeholderTextColor={'grey'}
            />
            <TextInput
                value={priority}
                onChangeText={value => setPriority(value)}
                style={styles.name}
                placeholder={'Enter Priority as "LOW" or "HIGH"'}
                placeholderTextColor={'grey'}
            />
            <TextInput
                value={date}
                onChangeText={value => setDate(value)}
                style={styles.name}
                placeholder={'Enter Date in format YYYY-MM-DD'}
                placeholderTextColor={'grey'}
            />
        </View>
        <View style={styles.bottomContainer}>
            <Pressable style={styles.button} onPress={onListAdd}>
            <Text style={styles.buttonText}>Add</Text>
            </Pressable>
        </View>
    </View>
  );
};

export default AddListScreen