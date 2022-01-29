import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlices';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env';

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination)
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!origin || !destination) return;

        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        });
    }, [origin, destination]);

    useEffect(() => {
        if (!origin || !destination) return;

        const getTravelTime = async () => {
            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
            units=metric
            &origins=${origin.description}
            &destinations=${destination.description}
            &mode=driving&language=pt-BR&sensor=true
            &key=${GOOGLE_MAPS_APIKEY}`)
                .then((res) => res.json())
                .then(data => {
                    dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
                    // console.warn(data.rows[0].elements[0])
                })
        };
        getTravelTime();
    }, [origin, destination, GOOGLE_MAPS_APIKEY]);

    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            switchMapType='mutedStandard'
            initialRegion={{
                latitude: origin.location.lat/* ? origin.location.lat: -23.181431 */,
                longitude: origin.location.lng/* ? origin.location.lng: -46.907400 */,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin && destination && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor='black'
                />
            )}
            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng
                    }}
                    title='Origin'
                    description={origin.description}
                    identifier='origin'
                />
            )}

            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng
                    }}
                    title='destination'
                    description={destination.description}
                    identifier='destination'
                />
            )}
        </MapView>
    );
};

export default Map

