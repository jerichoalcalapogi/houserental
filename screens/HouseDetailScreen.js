import React, { useContext, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ToastAndroid,
  Platform,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { FavoritesContext } from "../AppContext";
import { RentalsContext } from "../AppContext";

export default function HouseDetailScreen({ route, navigation }) {
  const { house } = route.params;
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const isFavorite = favorites.some((item) => item.id === house.id);

  /* ================= ANIMATION ================= */
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateHeart = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  /* ================= TOGGLE ================= */
  const handleFavorite = () => {
    toggleFavorite(house);
    animateHeart();

    if (Platform.OS === "android") {
      ToastAndroid.show(
        isFavorite ? "Removed from Favorites 💔" : "Added to Favorites ❤️",
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: house.image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{house.name}</Text>

          <TouchableOpacity onPress={handleFavorite} activeOpacity={0.7}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={35}
                color={isFavorite ? "red" : "gray"}
              />
            </Animated.View>
          </TouchableOpacity>
        </View>

        <Text style={styles.location}>📍 {house.location}</Text>

        <Text style={styles.price}>{house.price}</Text>

        <View style={styles.detailsBox}>
          <Text style={styles.detailText}>
            🛏 Bedrooms: {house.bedrooms}
          </Text>

          <Text style={styles.detailText}>
            🛁 Bathrooms: {house.bathrooms}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>

        <Text style={styles.description}>{house.description}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("RentalForm", { house })
          }
        >
          <Text style={styles.buttonText}>Rent Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },

  image: {
    width: "100%",
    height: 260,
  },

  content: {
    padding: 20,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    flex: 1,
  },

  location: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },

  price: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E7D32",
  },

  detailsBox: {
    backgroundColor: "#fff",
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    elevation: 3,
  },

  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },

  button: {
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 12,
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});