import React, { useState } from 'react';
import styles from './styles';
import {View, Text, TextInput, Pressable } from 'react-native'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import List from '../../components/List';
import { openDatabase } from "react-native-sqlite-storage";
 

const ListsScreen = props => {

  const navigation = useNavigation()

  const [lists, setLists] = useState([]);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      // declare empty array that will store results of SELECT
      let results = [];
      // declare transaction that will execute SELECT
      shopperDB.transaction(txn => {

      })

    })
  })

  return (
    <View style={styles.container}>
      <View>
        <FlatList
        data={lists}
        renderItem={({item}) => <List post={item} />}
        />
      </View>
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