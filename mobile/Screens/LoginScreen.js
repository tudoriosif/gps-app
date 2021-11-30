import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    View,
} from "react-native";
import axios from "axios";
import { API_URL } from "@env";
import deviceStorage from "../services/deviceStorage";

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = () => {
        if (username && password) {
            axios.post(`${API_URL}/login`, {
                username,
                password
            })
                .then((response) => deviceStorage.saveItem("token", response.data.token))
                .then((response) => {
                    navigation.navigate('Dashboard');
                })
                .catch((error) => {
                    ToastAndroid.show("Credentials are invalid!", ToastAndroid.SHORT);
                });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoView}>
                <Text style={styles.logoText}> SCD </Text>
                <Text style={styles.logoText}> Project </Text>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Username..."
                    placeholderTextColor="#FFF"
                    onChangeText={(username) => setUsername(username)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password..."
                    placeholderTextColor="#FFF"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={loginUser}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    logoView: {
        paddingBottom: "15%",
    },

    inputView: {
        backgroundColor: "#8d99ae",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        color: "#FFF",
        textAlign: "center",
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

    loginText: {
        color: "#FFF",
    },

    logoText: {
        fontSize: 54,
        fontWeight: "bold",
    },
});
