import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { BookmarksContext } from "../store/context/bookmarks-context";
import { NEWS } from "../data/dummy_data";
import List from "../components/List";
import Colors from "../constants/colors";


function BookmarksScreen (){
    const bookmarkedNewsctx = useContext(BookmarksContext);
    const bookmarkedNews = NEWS.filter((newsItem) => {
        return bookmarkedNewsctx.ids.includes(newsItem.id);
    });
    if (bookmarkedNews.length === 0) {
        return (
            <View style={styles.rootContainer}>
                <Text style={styles.text}>No Bookmarked Articles</Text>
            </View>
        );
    }
    return <List items={bookmarkedNews} />;
}

export default BookmarksScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.primary300,
    },
});