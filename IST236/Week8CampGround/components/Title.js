import { Text, StyleSheet, useWindowDimensions } from "react-native";

import Colors from "../constants/colors";

function Title(props){
    const { width, height } = useWindowDimensions();

    return <Text style={[styles.title, {fontSize: width * 0.13 }]}>{props.children}</Text>
}

export default Title;

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        color: Colors.primary800,
        fontFamily: "Mountain"
    }
})