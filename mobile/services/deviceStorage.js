import AsyncStorage from '@react-native-async-storage/async-storage';

const deviceStorage = {
    getItem: async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        } catch (error) {
            console.warn('AsyncStorage error: ' + error.message);
        }
    },
    saveItem: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
            return value;
        } catch (error) {
            console.warn('AsyncStorage error: ' + error.message);
        }
    },
    removeItem: async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.warn('AsyncStorage error: ' + error.message);
        }
    }
};

export default deviceStorage;