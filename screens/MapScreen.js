import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc'
import Map from '../components/Map';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import EatOptionsCard from '../components/EatOptionsCard';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();

    return (
        <View>
            <TouchableOpacity
            onPress={() => navigation.navigate('HomeScreen')}
            style={tw`bg-gray-200 absolute top-5 left-7 z-50 p-3 rounded-full shadow-md`}>
                <Icon name="menu" color='black'/>
            </TouchableOpacity>
            <View style={tw`h-1/2`}>
                <Map/>
            </View>
            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                    <Stack.Screen
                        name='NavigateCard'
                        component={NavigateCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name='RideOptionsCard'
                        component={RideOptionsCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name='EatOptionsCard'
                        component={EatOptionsCard}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </View>
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({})
