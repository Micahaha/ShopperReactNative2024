import React from 'react';
import {View, Text, Pressable, SafeAreaView,  Alert} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import database from '../../components/handlers/database'
import { openDatabase } from 'react-native-sqlite-storage';

const shopperDB = openDatabase({name: 'Shopper.db'})
const usersTableName = 'users';

const SignUpScreen = () => {

  const navigation = useNavigation();

  const onSubmit = async () => {
    if (!username || !password){
      Alert.alert('Invalid Input', 'Username and password are required!')
      return;
    }

    shopperDB.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM ${userTableName} WHERE username = "${username}"`,
        [],
        (_,res) => {
          let user = res.rows.length;
          if(user >= 1){
            Alert.alert('Invalid User', 'Username already exists!');
            return;
          } else {
            let salt = bcrypt.genSaltSync(3);
            let hash = bcrypt.hashSync(password, salt);
            database.addUser(username, hash);
            navigation.navigate('Home');

        
          }
        },
        error => {
          console.log('Error getting user ' + error.message);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 0.0}} />
      <View style={styles.header}>
        <Text style={styles.title}>
          Welcome to Shopper
          <Text style={styles.description}>
            {'\n' + '\n'}Shopper is a cross platform mobile application built
            using React Native.
          </Text>
          <Text style={styles.description}>
            {'\n' + '\n'}It maintains its data using an SQLite database.
          </Text>
          <Text style={styles.description}>
            {'\n' + '\n'}It allows its users to add, view, update, and delete
            shopping lists.
          </Text>
        </Text>
      </View>
      <View style={styles.bottom}>
        <Pressable
        style={styles.button}
        onPress={() => onSubmit()}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUpScreen;