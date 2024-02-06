import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import MovieItem from './components/MovieItem.js';



export default function App() {
  const [movieItems, setMovieItems] = useState([
    {
      name: "Star Wars",
      image: require("./assets/images/star_wars.jpg"),
      rating: "8.7",
    },
    {
      name: "Iron Man",
      image: require("./assets/images/iron_man.jpg"),
      rating: "7.9",
    },
    {
      name: "The Avengers",
      image: require("./assets/images/the_avengers.jpg"),
      rating: "8.0",
    },
    {
      name: "The Shawshank Redemption",
      image: require("./assets/images/the_shawshank_redemption.jpg"),
      rating: "9.3",
    },
    {
      name: "The Godfather",
      image: require("./assets/images/the_godfather.jpg"),
      rating: "9.2",
    },
    {
      name: "The Dark Knight",
      image: require("./assets/images/the_dark_knight.jpg"),
      rating: "9.0",
    },
    {
      name: "Schindler's List",
      image: require("./assets/images/schindlers_list.jpg"),
      rating: "8.9",
    },
    {
      name: "The Matrix",
      image: require("./assets/images/the_matrix.jpg"),
      rating: "8.7",
    },
    {
      name: "Forrest Gump",
      image: require("./assets/images/forrest_gump.jpg"),
      rating: "8.8",
    },
    {
      name: "Fight Club",
      image: require("./assets/images/fight_club.jpg"),
      rating: "8.8",
    },
  ]);

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.rootContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Top 10 Movies</Text>
        </View>
        <FlatList
          data={movieItems}
          renderItem={({ item }) => (
            <MovieItem
              name={item.name}
              image={item.image}
              rating={item.rating}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

