import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={{
        uri:
          "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1000"
      }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>
          House Rental System
        </Text>

        <Text style={styles.subtitle}>
          Find your dream house today
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Dashboard")
          }
        >
          <Text style={styles.buttonText}>
            View Houses
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center"
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  title: {
    fontSize: 34,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  },

  subtitle: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 40
  },

  button: {
    backgroundColor: "#2E7D32",
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 10
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  }
});