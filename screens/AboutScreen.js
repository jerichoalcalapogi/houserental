import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AboutScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Ionicons name="home" size={70} color="#2E7D32" />

        <Text style={styles.title}>House Rental System</Text>

        <Text style={styles.subtitle}>
          Making every house search easier, smarter, and closer to home.
        </Text>
      </Animated.View>

      {/* FEATURES */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>✨ Features</Text>

        <View style={styles.featureRow}>
          <Ionicons name="search-outline" size={22} color="#2E7D32" />
          <Text style={styles.featureText}>Browse available houses</Text>
        </View>

        <View style={styles.featureRow}>
          <Ionicons name="heart-outline" size={22} color="#2E7D32" />
          <Text style={styles.featureText}>Save favorite properties</Text>
        </View>

        <View style={styles.featureRow}>
          <Ionicons name="document-text-outline" size={22} color="#2E7D32" />
          <Text style={styles.featureText}>Generate rental receipts</Text>
        </View>

        <View style={styles.featureRow}>
          <Ionicons name="home-outline" size={22} color="#2E7D32" />
          <Text style={styles.featureText}>Manage rental history</Text>
        </View>
      </View>

      {/* ABOUT TEXT */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>About the App</Text>

        <Text style={styles.text}>
          House Rental System is designed to simplify the process of finding and
          renting houses. Users can browse available properties, explore house
          details, save favorites, and manage their rentals with ease.
        </Text>

        <Text style={styles.text}>
          We believe that a home is more than just a place to stay — it is where
          memories are created, dreams are nurtured, and new beginnings take shape.
        </Text>

        <Text style={styles.quote}>
          "Home is not just a place — it's a feeling of comfort & hope."
        </Text>
      </View>

      {/* APP INFO */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>App Info</Text>

        <Text style={styles.infoText}>Version: 1.0.0</Text>
        <Text style={styles.infoText}>Developer: Your Team</Text>
        <Text style={styles.infoText}>Platform: React Native Expo</Text>
      </View>
    </ScrollView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f4f6f8",
    flexGrow: 1,
  },

  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2E7D32",
    marginTop: 10,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginTop: 10,
    lineHeight: 24,
    paddingHorizontal: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 15,
  },

  text: {
    fontSize: 15,
    color: "#444",
    lineHeight: 24,
    textAlign: "justify",
    marginBottom: 12,
  },

  quote: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#2E7D32",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "600",
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  featureText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#444",
  },

  infoText: {
    fontSize: 15,
    marginBottom: 8,
    color: "#555",
  },
});