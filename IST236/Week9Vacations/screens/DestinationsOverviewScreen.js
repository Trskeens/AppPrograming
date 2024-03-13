import React, { useLayoutEffect } from "react";
import { View, FlatList } from "react-native";
import { COUNTRIES, DESTINATIONS } from "../data/dummy-data.js";
import DestinationItem from "../components/DestinationItem";

function DestinationsOverviewScreen(props) {
    const countryId = props.route.params.countryId;

    useLayoutEffect(() => {
        const country = COUNTRIES.find((country) => country.id === countryId);
        props.navigation.setOptions({ title: country ? country.name : null });
    }, [countryId, props.navigation]);

    const displayedDestinations = DESTINATIONS.filter((destinationItem) => {
        return destinationItem.countryId === countryId;
    });

    const renderDestinationItem = ({ item, index }) => {
        return (
            <DestinationItem 
                name={item.name}
                imageUrl={item.imageUrl}
                numDestinations={item.numDestinations}
                foundedYear={item.foundedYear}
                rating={item.rating}
                cost={item.cost}
                listIndex={index}
                destination={item} 
            />
        );
    };
    

    return (
        <View>
            <FlatList
                data={displayedDestinations}
                keyExtractor={(item) => item.id}
                renderItem={renderDestinationItem}
            />
        </View>
    );
}


export default DestinationsOverviewScreen;
