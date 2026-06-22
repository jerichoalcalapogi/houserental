import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";

export default function HouseCard({ house, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: house.image }}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.title}>{house.name}</Text>

        <Text style={styles.location}>
          📍 {house.location}
        </Text>

        <Text style={styles.rating}>
          ⭐ {house.rating.toFixed(1)} / 5.0
        </Text>

        <Text style={styles.price}>
          {house.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 15,
    elevation: 4
  },

  image: {
    width: "100%",
    height: 180
  },

  info: {
    padding: 12
  },

  title: {
    fontSize: 20,
    fontWeight: "bold"
  },

  location: {
    marginTop: 5,
    color: "#555"
  },

  rating: {
    marginTop: 8,
    color: "#444",
    fontWeight: "600",
  },

  price: {
    marginTop: 8,
    fontWeight: "bold",
    color: "#2E7D32",
    fontSize: 16
  }
});