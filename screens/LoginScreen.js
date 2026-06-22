import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../AppContext";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentUser } = useContext(UserContext);
  const backgroundImage = require("../assets/aa.jpg");

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Missing Information", "Please enter email and password");
        return;
      }

      const response = await fetch(
        "http://192.168.1.102/house_rental_api/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const text = await response.text();
      console.log("LOGIN RESPONSE:", text);

      const data = JSON.parse(text);

      if (data.success) {
        const rawStoredUser = await AsyncStorage.getItem("user");
        const storedUser = rawStoredUser ? JSON.parse(rawStoredUser) : null;
        const localPassword =
          storedUser && storedUser.email === email && storedUser.password
            ? storedUser.password
            : password;

        const savedUser = {
          ...data.user,
          password: localPassword,
          profilePic: storedUser?.profilePic || null,
        };

        console.log("USER DATA:", savedUser);

        // 🔥 CLEAR OLD SESSION
        await AsyncStorage.multiRemove([
          "currentUser",
          "user",
          "isLoggedIn",
          "favorites",
          "rentals",
        ]);

        // ✅ SET NEW USER
        await AsyncStorage.setItem("currentUser", savedUser.email);
        await AsyncStorage.setItem("user", JSON.stringify(savedUser));
        await AsyncStorage.setItem("isLoggedIn", "true");

        setCurrentUser(savedUser.email);

        console.log("CURRENT USER:", savedUser.email);

        Alert.alert("Welcome Back 🏠", "Login Successful");

        // 🚨 FORCE RESET NAVIGATION
        navigation.reset({
          index: 0,
          routes: [{ name: "Dashboard" }],
        });
      } else {
        const rawStoredUser = await AsyncStorage.getItem("user");
        const storedUser = rawStoredUser ? JSON.parse(rawStoredUser) : null;

        if (
          storedUser &&
          storedUser.email === email &&
          storedUser.password === password
        ) {
          await AsyncStorage.multiRemove([
            "currentUser",
            "user",
            "isLoggedIn",
            "favorites",
            "rentals",
          ]);

          await AsyncStorage.setItem("currentUser", storedUser.email);
          await AsyncStorage.setItem("user", JSON.stringify(storedUser));
          await AsyncStorage.setItem("isLoggedIn", "true");

        setCurrentUser(storedUser.email);
          navigation.reset({
            index: 0,
            routes: [{ name: "Dashboard" }],
          });
          return;
        }

        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      Alert.alert("Error", "Cannot connect to server");
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      imageStyle={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.logo}></Text>
        <Text style={styles.brand}>Findora Homes</Text>
        <Text style={styles.subtitle}>
          Find your perfect home today
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.card}
      >
        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.description}>
          Login to continue renting your dream house
        </Text>

        <View style={styles.inputBox}>
          <Text style={styles.icon}>📧</Text>
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#888"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.icon}>🔒</Text>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.register}>
            Don't have an account?
            <Text style={styles.link}> Register</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

/* styles */
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  header: { alignItems: "center", marginBottom: 30 },
  logo: { fontSize: 65 },
  brand: { fontSize: 34, fontWeight: "bold", color: "#fff" },
  subtitle: { color: "#D0FFD6", fontSize: 15, marginTop: 5 },
  card: {
    backgroundColor: "rgba(255,255,255,0.93)",
    borderRadius: 25,
    padding: 25,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    color: "#777",
    marginVertical: 15,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  icon: { fontSize: 20, marginRight: 10 },
  input: { flex: 1, paddingVertical: 15, fontSize: 16 },
  button: {
    backgroundColor: "#2E7D32",
    padding: 16,
    borderRadius: 15,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  register: { textAlign: "center", marginTop: 20, color: "#777" },
  link: { color: "#2E7D32", fontWeight: "bold" },
});