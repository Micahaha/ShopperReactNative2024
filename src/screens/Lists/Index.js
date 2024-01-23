import React from 'react';
import styles from './styles';
import {View, Text, TextInput, Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

const ListsScreen = props => {

  return (
    <View style={styles.container}>
        <View style={styles.bottom}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Add List')}>
                    <Text style={styles.buttonText}>Add List</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default ListsScreen;