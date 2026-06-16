import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AboutScreen() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Ionicons
          name="home"
          size={70}
          color="#2E7D32"
        />

        <Text style={styles.title}>
          House Rental System
        </Text>

        <Text style={styles.subtitle}>
          Making every house search easier, smarter,
          and closer to home.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          About the App
        </Text>

        <Text style={styles.text}>
          House Rental System is designed to simplify
          the process of finding and renting houses.
          Users can browse available properties,
          explore house details, save favorites,
          and manage their rentals with ease.
        </Text>

        <Text style={styles.text}>
          We believe that a home is more than just a
          place to stay. It is where memories are
          created, dreams are nurtured, and new
          beginnings take shape. Our goal is to help
          people find not just a house, but a place
          they can truly call home.
        </Text>

        <Text style={styles.quote}>
          "Home is not just a place—it's the feeling
          of comfort & hope."
        </Text>
      </View>
    </ScrollView>
  );
}

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

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 15,
    textAlign: "center",
  },

  text: {
    fontSize: 16,
    color: "#444",
    lineHeight: 26,
    textAlign: "justify",
    marginBottom: 15,
  },

  quote: {
    fontSize: 17,
    fontStyle: "italic",
    color: "#2E7D32",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "600",
  },
});