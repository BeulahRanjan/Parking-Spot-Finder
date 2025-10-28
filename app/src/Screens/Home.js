import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image} from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import imagePath from '../../src/constants/imagePath';
import Loader from '../../../components/Loader';
import { locationPermission, getCurrentLocation } from '../../src/helper/heplerFunction';
import Icon from 'react-native-vector-icons/MaterialIcons';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Home = ({ navigation }) => {
    const mapRef = useRef();
    const markerRef = useRef();

    const [state, setState] = useState({
        curLoc: null, // Placeholder, will update with the user's actual location
        destinationCords: {},
        isLoading: false,
        coordinate: new AnimatedRegion({
            latitude: 0,
            longitude: 0,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        }),
        time: 0,
        distance: 0,
        heading: 0,
        mapMoved: false, // Tracks if the user has moved the map
    });

    const { curLoc, destinationCords, isLoading, coordinate, time, distance, heading, mapMoved } = state;

    useEffect(() => {
        getLiveLocation();
        const interval = setInterval(() => {
            getLiveLocation();
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    // Fetch current location and update state
    const getLiveLocation = async () => {
        const permissionGranted = await locationPermission();
        if (permissionGranted) {
            const { latitude, longitude, heading } = await getCurrentLocation();
            updateState({
                heading: heading || 0,
                curLoc: { latitude, longitude },
                coordinate: new AnimatedRegion({
                    latitude,
                    longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }),
                mapMoved: false, // Resets the mapMoved state to hide recenter button
            });
        }
    };

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const fetchValue = async (data) => {
        updateState({
            destinationCords: {
                latitude: data.destinationCords.latitude,
                longitude: data.destinationCords.longitude,
            }
        });
        
    };

   
    const onMapMove = () => {
        updateState({ mapMoved: true });
    };

    const onCenter = () => {
        if (curLoc) {
            mapRef.current.animateToRegion({
                latitude: curLoc.latitude,
                longitude: curLoc.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            });
            updateState({ mapMoved: false });
        }
    };

    const fetchTime = (d, t) => {
        updateState({
            distance: d,
            time: t,
        });
    };

    return (
        <View style={styles.container}>
            {distance !== 0 && time !== 0 && (
                <View style={{ alignItems: 'center', marginVertical: 16 }}>
                    <Text>Time left: {time.toFixed(0)} mins</Text>
                    <Text>Distance left: {distance.toFixed(0)} km</Text>
                </View>
            )}
            <View style={{ flex: 1 }}>
                {curLoc && (
                    <MapView
                        ref={mapRef}
                        style={StyleSheet.absoluteFill}
                        initialRegion={{
                            ...curLoc,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }}
                        onRegionChangeComplete={onMapMove}
                    >
                        <Marker.Animated ref={markerRef} coordinate={coordinate}>
                            <Image
                                source={imagePath.icGreenMarkerlarge}
                                style={{
                                    width: 45,
                                    height: 45,
                                    // transform: [{ rotate: ${heading}deg }],  // Optional rotation based on heading
                                }}
                                resizeMode="contain"
                            />
                        </Marker.Animated>

                        {Object.keys(destinationCords).length > 0 && (
                            <Marker
                                coordinate={destinationCords}
                                image={imagePath.icGreenMarker} // Destination marker image
                            />
                        )}

                        {Object.keys(destinationCords).length > 0 && (
                            <MapViewDirections
                                origin={curLoc}
                                destination={destinationCords}
                                apikey={'AlzaSyD32QnO6rhybDvQWcFmJu640esM8Paf4Ix'}
                                
                                strokeWidth={6}
                                strokeColor="red"
                                optimizeWaypoints={true}
                                onStart={(params) => {
                                    console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                                }}
                                onReady={(result) => {
                                    fetchTime(result.distance, result.duration);
                                    mapRef.current.fitToCoordinates(result.coordinates, {
                                        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                                    });
                                }}
                                onError={(errorMessage) => {
                                    console.error('MapViewDirections Error:', errorMessage);
                                }}
                            />
                        )}
                    </MapView>
                )}

                    
              

                {/* Recenter button */}
                {mapMoved && (
                    <TouchableOpacity style={styles.recenterButton} onPress={onCenter}>
                        <Icon name="my-location" size={30} color="blue" />
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.bottomCard}>
                <Text>Where are you going..?</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('chooseLocation', { onUpdateDestination: fetchValue })}
                    style={styles.inpuStyle}
                >
                    <Text>Choose your location</Text>
                </TouchableOpacity>
            </View>
            <Loader isLoading={isLoading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomCard: {
        backgroundColor: 'white',
        width: '100%',
        padding: 30,
        borderTopEndRadius: 24,
        borderTopStartRadius: 24,
    },
    inpuStyle: {
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        height: 48,
        justifyContent: 'center',
        marginTop: 16,
    },
    recenterButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor:'#D3D3D3',
        borderRadius: 50,
        padding: 10,
    },
    recenterText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Home;















