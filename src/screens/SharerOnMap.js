import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Appbar, Avatar, Button, Divider, IconButton, Surface, Text } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import Polyline from '@mapbox/polyline';
import { withRouter } from 'react-router-native';

import Container from '../components/Container';
import Rating from '../components/Rating';

const API_KEY = 'AIzaSyB-b8_C-1Qm0W2UwuWq_DnmlfZuK8-CbVY';

const Map = props => {
    const [coords, setCoords] = useState([]);

    const [location, setLocation] = useState({
        // latitude: null,
        // longitude: null,
        latitude: 37.78825,
        longitude: -122.4324
    });

    const initialRegion = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const [region, setRegion] = useState(initialRegion);

    const handleRegionChange = region => {
        setRegion(region);
    };

    const destinationLocation = {
        latitude: location.latitude + 0.01,
        longitude: location.longitude + 0.001
    };

    const mergeCoords = () => {
        console.log('Merge coords');
        const { latitude, longitude } = location;
        const { latitude: destLatitude, longitude: destLongitude } = destinationLocation;

        console.log('lat: ' + latitude + ' lng: ' + longitude);
        console.log('destLat: ' + destLatitude + ' destLng: ' + destLongitude);

        const hasSartAndEnd = latitude !== null && destLatitude !== null;

        if (hasSartAndEnd) {
            console.log('Has start and end');
            const concatStart = `${latitude},${longitude}`;
            const concatEnd = `${destLatitude},${destLongitude}`;
            getDirections(concatStart, concatEnd);
        }
    };

    async function getDirections(startLocation, destLocation) {
        console.log('Get directions');

        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${startLocation}&destination=${destLocation}&key=${API_KEY}`,
            );
            const respJson = await response.json();

            console.log(respJson);  // TESTING

            const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            const coords = points.map(point => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                }
            });
            setCoords(coords);
        } catch (e) {
            console.log(e);
        }
    };

    // useEffect(() => {
    //     (async () => {
    //         const { status } = await Permissions.getAsync(Permissions.LOCATION);

    //         if (status !== 'granted') {
    //             const response = await Permissions.askAsync(Permissions.LOCATION);
    //         }

    //         navigator.geolocation.getCurrentPosition(
    //             ({ coords: { latitude, longitude } }) => {
    //                 const position = { latitude, longitude };
    //                 setLocation(position);
    //             },
    //             (e) => console.log(e),
    //             { enableHighAccuracy: true, timeout: 3000, maximumAge: 2000 }
    //         );
    //     })();
    // }, []);

    // useEffect(() => {
    //     if(location.latitude && destinationLocation.latitude) {
    //         mergeCoords();
    //     }
    // }, [location.latitude, destinationLocation.latitude]);

    return (
        <View style={{ width: '100%', flex: 1 }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { props.history.push('/Delivery') }} />
                <Appbar.Content title='Delivery Location' />
            </Appbar.Header>
            {(location.latitude && location.longitude) ?
                <View style={{ width: '100%', flex: 1 }}>
                    <MapView
                        // showsUserLocation
                        style={styles.map}
                        initialRegion={initialRegion}
                        onRegionChange={handleRegionChange}
                    >
                        {(region.latitude && region.longitude) &&
                            <Marker
                                // draggable
                                coordinate={destinationLocation}
                                title={'me'}
                                description={'my location'}
                                // onDragEnd={(e) => handleRegionChange(e.nativeEvent.coordinate)}
                            />
                        }
                        {(destinationLocation.latitude && destinationLocation.longitude) &&
                            <Marker
                                coordinate={initialRegion}
                                title={'ali'}
                                description={'sharer'}
                                image={require('../../assets/custom-marker.png')}
                            />
                        }
                        {(destinationLocation.latitude && destinationLocation.longitude) &&
                            <MapView.Polyline
                                strokeWidth={2}
                                strokeColor='red'
                                coordinates={coords}
                            />
                        }
                    </MapView>
                    <Surface style={styles.card}>
                        <View style={styles.cardUpperPart}>
                            <View style={styles.cardUpperPartItem}>
                                <Text style={{ textAlign: 'center' }}>3 km away</Text>
                            </View>
                            <View style={styles.cardUpperPartItem}>
                                <Text style={{ textAlign: 'center' }}>Estimated fair: Rs 150</Text>
                            </View>
                        </View>
                        <Divider />
                        <View style={styles.profileCard}>
                            <TouchableOpacity
                                style={styles.profileCardLeftPart}
                                onPress={() => props.history.push('/Feedback')}
                            >
                                <View style={styles.avatarIcon}>
                                    <Avatar.Icon size={35} icon='folder' />
                                </View>
                                <View style={styles.profileInfo}>
                                    <Text>ali</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.profileRating}>
                                <Rating rating={5} />
                            </View>
                        </View>
                    </Surface>
                </View>
                :
                <Container>
                    <Text>Loading..</Text>
                </Container>
            }
            {/* <View style={{flexDirection: 'row', justifyContent: 'space-around'}} >
                <Button style={styles.btn} mode='contained' onPress={() => {console.log('Button pressed')}}>
                    accept
                </Button>
                <Button style={styles.btn} mode='outlined' onPress={() => {console.log('Button pressed')}}>
                    reject
                </Button>
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    avatarIcon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        flex: 1,
        width: '100%',
    },
    card: {
        padding: 8,
        height: 80,
        width: '100%',
        elevation: 4,
    },
    cardUpperPart: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    cardUpperPartItem: {
        flex: 1,
    },
    profileCard: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    profileCardLeftPart: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileInfo: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    profileRating: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shareListBtn: {
        width: '100%',
        paddingVertical: 10,
    },
});

export default withRouter(Map);