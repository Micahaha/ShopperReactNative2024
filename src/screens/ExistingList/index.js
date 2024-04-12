import React, { useState } from 'react';
import styles from './styles';
import {View, Text, TextInput, Pressable, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// create constant that object that refers to database
const shopperDB = openDatabase({name: 'Shopper.db'});

// create contant that contains the naem of the lists table
const listsTableName = 'lists';

const ExistingListScreen = props => {

    const post = props.route.params.post;

    const [name, setName] = useState(post.name);
    const [store, setStore] = useState(post.store);
    const [date, setDate] = useState(post.date);
    const [priority, setPriority] = useState(post.priority);

    const navigation = useNavigation()

    
    const onListUpdate = () => {
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
        SCHEDU.transaction(txn => {
            txn.executeSql(
                `UPDATE ${listsTableName} SET name = "${name}", store = "${store}", date = "${date}", priority = "${priority}" WHERE id = "${post.id}"`,
                [],
                () => {
                    console.log(`${name} updated successfully`)
                },
                error => {
                    console.log('Error on updating list ' + error.message);
                }
            );
        });

        alert(name + ' updated!');
    }

    const onListDelete = () => {
        return Alert.alert(
            // title
            'Confirm',
            // message
            'Are you sure you want to delete this list?',
            // code for buttons 
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        shopperDB.transaction(txn => {
                            txn.executeSql(
                                `DELETE FROM ${listsTableName} WHERE id = ${post.id}`,
                                [],
                                () => 
                                {
                                    console.log(`${name} deleted successfully`);
                                },
                                error => {
                                    console.log('Error on deleting list ' + error.message);
                                }
                            );
                        });
                        alert('List Deleted!');
                    },
                },
                {
                    text: 'No',
                },
            ],
        );
    }
    const onAddItem = () => {
        navigation.navigate('Add List Item', {post: post});

      
    }
    const onViewList = () => {
        navigation.navigate('View List Items', {post:post});
    }



  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <TextInput
                accessible={true}
                accessibilityLabel={selectedDate}
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
            <Pressable
               accessible={true}
               accessibilityRole='button'
               accessibilityLabel='Double tap to update list'
            style={styles.updateButton} onPress={onListUpdate}>
            <Text style={styles.buttonText}>Update</Text>
            </Pressable>
            <Pressable
                accessible={true}
                accessibilityRole='button'
                accessibilityLabel='Double tap to delete list'
            style={styles.deleteButton} onPress={onListDelete}>
            <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
            <Pressable
              accessible={true}
              accessibilityRole='button'
              accessibilityLabel='Double tap to add an item to this list'
              accessibilityHint='Open add item screen'
            style={styles.addButton} onPress={onAddItem}>
            <Text style={styles.buttonText}>Add</Text>
            </Pressable>
            <Pressable
             accessible={true}
             accessibilityRole='button'
             accessibilityLabel='Double tap to view items added to this list'
             accessibilityHint='Open view item screen'
            style={styles.viewButton} onPress={onViewList}>
            <Text style={styles.buttonText}>View Items</Text>
            </Pressable>
        </View>
    </View>
  );
};

export default ExistingListScreen;