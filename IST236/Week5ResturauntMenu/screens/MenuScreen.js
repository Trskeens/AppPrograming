import { View, StyleSheet, Text, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import NavButton from "../components/NavButton";
import Title from "../components/Title";
import MenuItem from "../components/MenuItems";




function MenuScreen(props) {
    //set safe area screen boundaries
    const insets = useSafeAreaInsets();

    const [menuItems, setMenuItems] = useState([
        {
            name: "Ribeye Steak 10oz",
            image: require("../assets/images/texasribeye.jpg"),
            price: "$15.99",
            id: 1,
          },
          {
            name: "Half Rack of BBQ Ribs",
            image: require("../assets/images/texasribs.jpg"),
            price: "$13.99",
            id: 2,
          },
          {
            name: "Fried Catfish 3-Piece",
            image: require("../assets/images/texascatfish.jpg"),
            price: "$11.99",
            id: 3,
          },
          {
            name: "Grilled Chicken Salad",
            image: require("../assets/images/texassalad.jpg"),
            price: "$9.99",
            id: 4,
          },
          {
            name: "Cheeseburger",
            image: require("../assets/images/texasburger.jpg"),
            price: "$8.99",
            id: 5,
          },
    ]);

    return (
        <View
         style={[
            styles.rootContainter,
            {
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            },
        ]}
       >

            <View style={styles.titleContainer}>
                <Title>Menu</Title>
            </View>

            <View style={styles.listContainer}>
                <FlatList 
                data = {menuItems}

                keyExtractor={(item) => item.id}

                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
                renderItem={(itemData) => {
                    return (
                        <MenuItem
                            name={itemData.item.name}
                            image={itemData.item.image}
                            price={itemData.item.price}
                        />
                    );
                }}
                
                />
            </View>

            <View style={styles.buttonContainer}>
                <NavButton onPress={props.onNext}>View Home</NavButton>
            </View>
            

        </View>
    );

}

export default MenuScreen;

const styles = StyleSheet.create({
    rootContainter: {
        flex: 1,
        alignItems: "center"
    },
    titleContainer: {
        flex: 1,
        justifyContent: "center"
    },
    listContainer: {
        flex: 7,
        width: 300
    },
    buttonContainer: {
        flex: 1
    },
});