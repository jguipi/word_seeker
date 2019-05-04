import { AsyncStorage } from "react-native";

export async function setSecureItem(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
}

export async function getSecureItem(key) {
  try {
    let value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSecureItem(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
}
