import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function App() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
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
                    onChangeText={(password) => setUsername(password)}
                />
            </View>

            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    logoView: {
      alignItems: "center",
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
        fontSize: 52,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
});
