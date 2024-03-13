import { Pressable, View, StyleSheet, Image, Text } from "react-native"
import Colors from "../constants/colors";
import ImageviewModal from "../modals/ImageViewModal.js"
import React, { useState } from "react";

function DestinationItem(props) {
    const [modalIsVisible, setModalIsVisible] = useState(false)

    function viewImageHandler(){
        setModalIsVisible(true)
    }

    function closeImageHandler(){
        setModalIsVisible(false)
    }

    return(
        <View
            style={[
                styles.itemContainer,
                {backgroundColor: props.listIndex % 2 == 0 ? "#ccc" : "#fff"}
            ]}
        >
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed ? styles.buttonPressed : null,
                ]}
                android_ripple={{color: Colors.primary300}}
                onPress={viewImageHandler}
            >
                <View style={styles.rowContainer}>
                    <Image style={styles.image} source={{ uri: props.destination.imageUrl }}/>
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{props.destination.name}</Text>
                        <View style={styles.innerRowContainer}>
                            <Text style={styles.text}>Average Cost: ${props.destination.averageCost}</Text>
                            <Text style={styles.text}>Founded: {props.destination.yearFounded}</Text>
                        </View>
                        <View style={styles.innerRowContainer}>
                            <Text style={styles.text}>Rating: {props.destination.averageUserRating} / 5</Text>
                        </View>
                    </View>
                </View>
            </Pressable>

            <ImageviewModal
                isVisible={modalIsVisible}
                destination={props.destination} 
                onClose={closeImageHandler}
            />
        </View>
    );
}


export default DestinationItem;

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: "#ccc",
        paddingHorizontal: 5,
        paddingTop: 3,
        marginBottom: 3,
        borderRadius: 7,
    },
    button: {
        flex: 1,
    },
    buttonPressed: {
        opacity: 0.5,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        borderRadius: 15,
    },
    infoContainer: {
        flex: 1,
        paddingLeft: 20,
    },
    name: {
        fontWeight: "bold",
        fontSize: 20,
    },
    text: {
        fontSize: 14,
    },
    innerRowContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});
