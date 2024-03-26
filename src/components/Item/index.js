import React from 'react';
import styles from './styles';
import {Alert, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const database = require('../handlers/database.js');


const Item = props => {

    const post = props.post;


    const navigation = useNavigation();
    
    const onPress = () => {
        if (post.list_id) {
            try {
                database.addListItem(post.list_id, post.list_id);

            } catch (error) {
                console.log('Error Adding List Item' + error)
            }
            alert('Item added to list!')
        } else {
            navigation.navigate('Existing Item', {post: post})
        }
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.touchable} onPress = {onPress}>
            <View style={{flex: 1}}>
                <Text style={styles.name} numberOfLines={2}>{post.name}</Text>
                <Text style={styles.price} numberOfLines={2}>{post.price}</Text>
            </View>
            <View style ={{flex: 1}}>
                <Text style={styles.quantity}>quantity: {post.quantity}</Text>
            </View>
        </TouchableOpacity>
    </View>
  );
};

export default Item;