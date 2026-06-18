import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us 📞</Text>

      {/* PHONE */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => Linking.openURL("tel:+639123456789")}
      >
        <Ionicons name="call-outline" size={22} color="#2E7D32" />
        <Text style={styles.text}>+63 912 345 6789</Text>
      </TouchableOpacity>

      {/* EMAIL */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => Linking.openURL("mailto:support@houserental.com")}
      >
        <Ionicons name="mail-outline" size={22} color="#2E7D32" />
        <Text style={styles.text}>support@houserental.com</Text>
      </TouchableOpacity>

      {/* LOCATION */}
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          Linking.openURL("https://maps.google.com/?q=Cebu City Philippines")
        }
      >
        <Ionicons name="location-outline" size={22} color="#2E7D32" />
        <Text style={styles.text}>Cebu City, Philippines</Text>
      </TouchableOpacity>

      {/* FOOTER */}
      <Text style={styles.footer}>
        We usually respond within 24 hours ⚡
      </Text>
    </View>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f6f8",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#222",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  text: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },

  footer: {
    marginTop: 25,
    textAlign: "center",
    color: "#666",
    fontSize: 14,
  },
});