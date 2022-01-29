import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { Icon, Image } from 'react-native-elements'
import { useSelector } from 'react-redux';
import tw from 'twrnc';
import { selectTravelTimeInformation } from '../slices/navSlices';
import "intl";
import "intl/locale-data/jsonp/pt-BR";

const data = [
    {
        id: 'Uber-X-123',
        title: 'Uber X',
        multiplier: 1,
        image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_303,h_170/f_auto,q_auto/products/carousel/UberX.png'
    },
    {
        id: 'Uber-XL-456',
        title: 'Uber XL',
        multiplier: 1.2,
        image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_303,h_170/f_auto,q_auto/products/carousel/UberXL.png'
    },
    {
        id: 'Uber-LUX-789',
        title: 'Uber LUX',
        multiplier: 1.5,
        image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_303,h_170/f_auto,q_auto/products/carousel/Black.png'
    }
]

const SURGE_CHARGE_RATE = 2.7;

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const traveltimeInformation = useSelector(selectTravelTimeInformation);

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('NavigateCard')}
                    style={tw`absolute top-3 left-1 p-3 rounded-full z-1`
                    }>
                    <Icon name='chevron-left' type='fontawesome' />
                </TouchableOpacity>
                <View style={tw`flex-row justify-center pt-5 pb-2`}>
                    <Text style={tw`text-xl text-gray-500`}>Escolha uma viagem - </Text>
                    <Text style={tw`text-xl text-gray-700`}>{traveltimeInformation?.distance?.text}</Text>
                </View>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item: { id, title, multiplier, image }, item }) => (
                    <TouchableOpacity
                        onPress={() => setSelected(item)}
                        style={tw`flex-row justify-between items-center pl-5 ${id === selected?.id && "bg-gray-100"}`}>
                        <Image
                            style={{
                                width: 100,
                                height: 90,
                                resizeMode: 'contain',
                                transform: [{ scale: 1.5 }]
                            }}
                            source={{ uri: image }}
                        />
                        <View style={tw`mr-2`}>
                            <Text style={tw`text-xl font-semibold text-gray-800`}>{title}</Text>
                            <Text>{traveltimeInformation?.duration?.text}</Text>
                            <Text style={tw`text-xs text-gray-400`}>Tempo de viagem</Text>
                        </View>
                        <Text style={tw`text-xl px-10 text-gray-700`}>
                            
                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(
                                (traveltimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100
                            )}

                        </Text>
                    </TouchableOpacity>
                )}
            />

            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity
                    disabled={!selected}
                    style={tw`bg-gray-800 py-3 m-3 rounded ${!selected && 'bg-gray-300'}`}>
                    <Text style={tw`text-center text-white text-xl`}>Escolha {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard;

const styles = StyleSheet.create({});
