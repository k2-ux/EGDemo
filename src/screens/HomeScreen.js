import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
const{height,width} = Dimensions.get('screen')
const data = [
  { id: '1', title: 'Deviceinfo',name : 'Device Info' },
  { id: '2', title: 'Numbers' ,name: 'Your Numbers'},
];

const HomeScreen = ({ navigation }) => {
  const handleItemPress = (item) => {
    navigation.navigate(item.title)
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleItemPress(item)}
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor:'#A6F4DC'

  },
  flatListContainer: {
    flexDirection: 'column', 
    justifyContent: 'space-between', 
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8, 
    padding: 16,
    backgroundColor: '#5FB49C',
    borderRadius: 8,
    height:height*0.1,
    width:width-30,
    borderWidth:1,
    borderColor:'white',
    elevation:10
  },
  itemText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize:20
  },
});

export default HomeScreen;
