/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import Router from './src/navigation/Router';
import { LogBox } from 'react-native';
import bcrypt from 'react-native-bcrypt';
import { openDatabase } from 'react-native-sqlite-storage';

const database = require('./src/components/handlers/database.js')

const shopperDB = openDatabase({name: 'Shopper.db'});
const usersTableName = 'users';

let salt = bcrypt.genSaltSync(10);

const App: () => Node = () => {
  try {
    database.createListsTable();

  }
  catch (error){
    console.log('Failed to create lists table ' + error);
  }

  try { database.createItemsTable(); }
  catch (error){
    console.log('Failed to create items table ' + error);
  }

  try { database.createListsItemsTable(); }
  catch (error){
    console.log('Failed to create items table ' + error);
  }
  try {database.createUsersTable(); }
  catch (error){
    console.log('Failed to create users table ' + error)
  }

  try { let hash = bcrypt.hashSync('Firelegend101$', salt);
    database.addUser('cahmi00', hash);
   } 
  catch (error) {
    console.log('Failed to add user ' + error)
   }

  return <Router />;
};
LogBox.ignoreLogs(['Math.random']);

export default App;