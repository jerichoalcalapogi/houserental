import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from "react-native";

export default function HouseDetailScreen({
  route,
  navigation
}) {
  const { house } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: house.image }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          {house.name}
        </Text>

        <Text style={styles.location}>
          📍 {house.location}
        </Text>

        <Text style={styles.price}>
          {house.price}
        </Text>

        <View style={styles.detailsBox}>
          <Text style={styles.detailText}>
            🛏 Bedrooms: {house.bedrooms}
          </Text>

          <Text style={styles.detailText}>
            🛁 Bathrooms: {house.bathrooms}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Description
        </Text>

        <Text style={styles.description}>
          {house.description}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("RentalForm", {
              house
            })
          }
        >
          <Text style={styles.buttonText}>
            Rent Now
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8"
  },

  image: {
    width: "100%",
    height: 260
  },

  content: {
    padding: 20
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222"
  },

  location: {
    fontSize: 16,
    color: "#666",
    marginTop: 5
  },

  price: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E7D32"
  },

  detailsBox: {
    backgroundColor: "#fff",
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    elevation: 3
  },

  detailText: {
    fontSize: 16,
    marginBottom: 10
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 10
  },

  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24
  },

  button: {
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 12,
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center"
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  }
});