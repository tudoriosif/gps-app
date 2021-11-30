import React, { useState, useEffect } from "react";
import { PermissionsAndroid, Platform, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { getUniqueId } from "react-native-device-info";
import Geolocation from '@react-native-community/geolocation';
import axios from "axios";
import { API_URL } from "@env";
import deviceStorage from "../services/deviceStorage";

const DashboardScreen = ({ navigation }) => {
    const [long, setLong] = useState(0);
    const [lat, setLat] = useState(0);
    const [geoPermission, setGeoPermission] = useState(false);
    const [token, setToken] = useState('');

    const deviceID = getUniqueId();

    const logout = async () => {
        await deviceStorage.removeItem('token');
        navigation.goBack();
    }

    const sendLocation = async () => {

        if(!geoPermission){
            ToastAndroid.show('Must provide location permission!', ToastAndroid.SHORT);
            return null;
        }

        Geolocation.getCurrentPosition((info) => {
            const { latitude, longitude } = info.coords;

            setLat(latitude);
            setLong(longitude);

            const uri = `${API_URL}/positions`;

            axios.post(uri, {
                latitude,
                longitude,
                terminalId: deviceID,
            }, {
                headers: { Authorization: `Bearer ${token}`}
            })
                .then((response) => {
                    if(response.status === 200) {
                        ToastAndroid.show('Location successfully sent!', ToastAndroid.SHORT);
                    }
                        
                })
                .catch((error) => {
                    ToastAndroid.show('Request failed!', ToastAndroid.SHORT);
                })
        },
            (error) => console.warn(error),
            { enableHighAccuracy: true, timeout: 20000 });
    };

    useEffect(() => {
        (async () => {
            const deviceToken = await deviceStorage.getItem('token');
            setToken(deviceToken);

            if (!deviceToken) {
                ToastAndroid.show('Invalid token!', ToastAndroid.SHORT);
                navigation.goBack();
            }

            if (Platform.OS === 'android') {
                try {
                    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                        title: 'Location Access Required',
                        message: 'App needs to access your location'
                    });

                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        setGeoPermission(true);
                    }
                } catch (error) {
                    console.warn(error);
                }
            }
        })();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.deviceData} >
                <View style={styles.componentData}>
                    <Text style={styles.dataText} > Device ID is: </Text>
                    <Text style={styles.dataText} > {deviceID} </Text>
                </View>
                <View style={styles.componentData}>
                    <Text style={styles.dataText} > Latitude: </Text>
                    <Text style={styles.dataText} > {Number(lat).toFixed(4)} </Text>
                </View>
                <View style={styles.componentData}>
                    <Text style={styles.dataText} > Longitude: </Text>
                    <Text style={styles.dataText} > {Number(long).toFixed(4)} </Text>
                </View>
            </View>

            <TouchableOpacity style={styles.sendBtn} onPress={sendLocation}>
                <Text style={styles.loginText}>Send location</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={logout}>
                <Text style={styles.loginText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DashboardScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    sendBtn: {
        width: "70%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#457b9d",
    },

    loginText: {
        color: "#FFF",
    },

    loginBtn: {
        width: "70%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#2b2d42",
    },

    deviceData: {
        alignItems: "center",
    },

    componentData: {
        alignItems: "center",
        marginBottom: 25,
    },

    dataText: {
        fontSize: 24,
        color: "#606060",
    }
});
