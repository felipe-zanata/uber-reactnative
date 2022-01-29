import React from 'react'
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from 'react-native'
import tw from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestionation } from '../slices/navSlices';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const greetingMessage = () => {
        let h = new Date().getHours();
        switch (true) {
          case h <= 5: return 'Boa madrugada';
          case h < 12: return 'Bom dia';
          case h < 18: return 'Boa tarde';
          default: return 'Boa noite';
        }   
      }
      

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl text-black`}>
            {greetingMessage()}, Felipe
            </Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete
                        placeholder='Para onde?'
                        styles={toInputBoxStyles}
                        returnKeyType={'search'}
                        minLength={2}
                        onPress={(data, details = null) => {
                            dispatch(
                                setDestionation({
                                    location: details.geometry.location,
                                    description: data.description
                                })
                            );
                            navigation.navigate('RideOptionsCard');
                        }}
                        fetchDetails={true}
                        enablePoweredByContainer={false}
                        query={{
                            key: GOOGLE_MAPS_APIKEY,
                            language: 'pt-BR'
                        }}
                        nearbyPlacesAPI='GooglePlacesSearch'
                        debounce={400}
                    />
                </View>
                <NavFavourites/>
            </View>

            <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
                <TouchableOpacity 
                onPress={() => navigation.navigate('RideOptionsCard')}
                style={tw`flex flex-row bg-gray-800 justify-evenly w-40 px-4 py-3 rounded-full`}>
                   <Icon name='car' type='font-awesome' color='white' size={16}/>
                        <Text style={tw`text-white text-center`}>Viagem</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={() => navigation.navigate('EatOptionsCard')}
                style={tw`flex flex-row text-gray-700 justify-evenly w-40 px-4 py-3 rounded-full border border-gray-700`}>
                   <Icon name='fast-food-outline' type='ionicon' color='black' size={16}/>
                        <Text style={tw`text-gray-800 text-center`}>Entrega</Text>
                </TouchableOpacity>        
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
        justifyContent: 'space-evenly'
    },
    textInput: {
        backgroundColor: '#DDDDDF',
        borderRadius: 0,
        fontSize: 18
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0
    }
})
