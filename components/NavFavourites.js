import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements';
import tw from 'twrnc';

export default function NavFavourites() {

    const data=[
        {
            id: '123',
            icon: 'home',
            location: 'Casa',
            destination: "Av. Reynaldo Porcari, 1385 - Medeiros, Jundiaí - SP, Brasil"
        },
        {
            
            id: '456',
            icon: 'briefcase',
            location: 'Trabalho',
            destination: "Cento de Distribuição Via Varejo - Castanho, Jundiaí - SP, Brasil"
        }
    ];

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => ( <View style={tw`bg-gray-200`, {height: 0.5}} /> )}
            renderItem={({item: { location, destination, icon} }) => (
                <TouchableOpacity 
                style={tw`flex-row items-center p-5 w-90%`}>
                    <Icon
                        style={tw`mr-4 rounded-full bg-gray-400 p-4`}
                        name={icon}
                        type='ionicon'
                        color='white'
                        size={18}
                        />
                        <View>
                            <Text style={tw`font-semibold text-lg text-gray-700`}>{location}</Text>
                            <Text style={tw`text-gray-500`}>{destination}</Text>
                        </View>
                </TouchableOpacity>
            )}
        />
    )
}

const styles = StyleSheet.create({})
