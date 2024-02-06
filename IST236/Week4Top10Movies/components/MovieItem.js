import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const MovieItem = ({ name, image, rating }) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.rating}>Rating: {rating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
    color: 'gray',
  },
});

export default MovieItem;


