import { View, StyleSheet, FlatList } from "react-native";
import NewsItem from "./NewsItem";

function NewsList(props) {

  function renderNewsItem(itemData) {

    const newsItemProps = {
      id: itemData.item.id,
      headline: itemData.item.headline,
      date: itemData.item.date,
      author: itemData.item.author,
      agency: itemData.item.agency,
      description: itemData.item.description,
      imageUrl: itemData.item.imageUrl,
      listIndex: itemData.index,
    };
    return <NewsItem {...newsItemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={props.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNewsItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default NewsList;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "black"
  },
  backgroundImage: {
    opacity: 0.1,
  },
});
