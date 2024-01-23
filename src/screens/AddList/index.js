import React, { useState } from 'react';
import {View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles'


const AddListScreen = props => {

    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [store, setStore] = useState('');
    const [date, setDate] = useState('');

    const onListAdd = () => {
        if (!name){
            alert('Plase enter a shopping list name.')
            return;
        }

        if (!store){
            alert('Plase enter a shopping list name.')
            return;
        }

        if (!date){
            alert('Plase enter a shopping list name.')
            return;
        }
        alert(name = 'Added.')
        navigation.navigate('Start Shopping!');
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
                value={name}
                onChangeText={value => setStore(value)}
                style={styles.name}
                placeholder={'Enter Store'}
                placeholderTextColor={'grey'}
            />
             <TextInput
                value={name}
                onChangeText={value => setDate(value)}
                style={styles.name}
                placeholder={'Enter Date in format YYYY-MM-DD'}
                placeholderTextColor={'grey'}
            />
        </View>
        <View style={styles.bottomContainer}>
            <Pressable style={styles.button} onPress={onListAdd}>
                <text style={styles.buttonText}>Add</text>
            </Pressable>
        </View>
    </View>
  );
};

export default AddListScreen