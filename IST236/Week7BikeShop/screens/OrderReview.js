import { View, StyleSheet, Text } from "react-native";
import Title from "../components/Title";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../constants/colors";
import NavButton from "../components/NavButton";
import { LinearGradient } from "expo-linear-gradient";

function OrderReviewScreen(props){
    const insets = useSafeAreaInsets();
    return (
        <LinearGradient
            colors={[Colors.accent800, Colors.accent700]}
            style={styles.linearGradient}
        >
            <View
                style={[
                    styles.rootContainer,
                    {
                        paddingTop: insets.top,
                        paddingBottom: insets.bottom,
                        paddingLeft: insets.left,
                        paddingRight: insets.right,
                    },
                ]}
            >
                <View style={styles.titleContainer}>
                    <Title>Order Summary</Title>
                </View>

                <View style={styles.subTitleContainer}>
                    <Text style={styles.subOptions}>Your order has been placed with the order details below</Text>
                </View>

                <View style={styles.repairOptionsContainer}>
                    <Text style={styles.options}>Repair Time:</Text>
                    <Text style={styles.subOptions}>{props.times}</Text>
                    <Text style={styles.options}>Services:</Text>
                    {props.service.map((item) => {
                        if (item.value){
                            return (
                                <Text key={item.id} style={styles.subOptions}>
                                    {item.name}
                                </Text>
                            )
                        }
                    })}
                    <Text style={styles.options}>Add Ons:</Text>
                    <Text style={styles.subOptions}>{props.news ? "Signed up for newsletter" : ""}</Text>
                    <Text style={styles.subOptions}>{props.rentalMem ? "Signed up for Rental Membership" : ""}</Text>
                </View>

                <View style={styles.subTitleContainer}>
                    <Text style={styles.subTitle}>SubTotal: ${props.price.toFixed(2)}</Text>
                    <Text style={styles.subTitle}>
                        Sales Tax: ${(props.price * 0.06).toFixed(2)}{" "}
                    </Text>
                    <Text style={styles.subTitle}>
                        Total: ${(props.price + props.price * 0.06).toFixed(2)}
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <NavButton onPress={props.onNext}>Return Home</NavButton>
                </View>
            </View>
        </LinearGradient>
    );
}

export default OrderReviewScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    },
    linearGradient: {
        flex: 1,
        width: '100%',
    },
    titleContainer: {
        marginBottom: 10,
        marginHorizontal: 10,
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: Colors.primary700
    },
    subTitleContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    subTitle: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.primary700,
        fontFamily: "Migae"
    },
    repairOptionsContainer: {
        flex: 3,
        paddingHorizontal: 20,
    },
    options: {
        fontSize: 20,
        color: Colors.primary700,
        fontFamily: "Migae"
    },
    subOptions: {
        textAlign: "center",
        fontSize: 17,
        fontWeight: "bold",
        fontFamily: "Migae"
    },
    buttonContainer: {
        alignItems: "center",
    },
});
