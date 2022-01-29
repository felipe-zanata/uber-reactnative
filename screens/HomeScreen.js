import React from 'react';
import { Image, SafeAreaView, StyleSheet, View, Button } from 'react-native';
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestionation, setOrigin } from '../slices/navSlices';
import NavFavourites from '../components/NavFavourites';
import Geolocation from 'react-native-geolocation-service'
import { PermissionsAndroid } from 'react-native';

navigator.geolocation = require('react-native-geolocation-service');

const requestGeoPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      alert('Acesso concedido');}
};

const HomeScreen = () => {
    const dispatch = useDispatch();
   
    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain'
                    }}
                    source={{
                        uri: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
                    }}
                />
                <GooglePlacesAutocomplete
                    placeholder='Onde você está?'
                    currentLocation={true}
                    currentLocationLabel='Localização Atual'
                    styles={styles}
                    listViewDisplayed='auto'
                    autoFillOnNotFound={true}
                    onPress={(data, details = null) => {
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description
                        }))

                        dispatch(setDestionation(null))
                    }}  
                    fetchDetails={true}
                    returnKeyType={'search'}
                    enablePoweredByContainer={false}
                    minLength={2}
                    getDefaultValue={() => ''}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'pt-BR',
                        type: 'address'
                    }}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    GooglePlacesSearchQuery={{
                        rankby: 'distance'
                    }}
                    debounce={400}
                    textInputProps={{ onBlur: () => { } }}
                    GooglePlacesDetailsQuery={{ fields: ['geometry', 'formatted_address'] }}
                    debounce={300} 
                />
                <NavOptions />
                <NavFavourites />
                {/* <Button
                    title='Permissão'
                    onPress={requestGeoPermission}
                /> */}
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 0
    },
    description: {
        fontWeight: 'bold',
    },
    textInput: {
        fontFamily: "AvenirMedium",
        color: '#5d5d5d',
        fontSize: 18,
    },
    predefinedPlacesDescription: {
        color: '#1faadb',
    },
    listView: {
        color: 'black',
        zIndex: 1000,
        position: 'absolute',
        top: 45
    },
});
