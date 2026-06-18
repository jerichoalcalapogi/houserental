import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FavoritesContext } from "../AppContext";

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>

        <View style={styles.counter}>
          <Text style={styles.counterText}>{favorites.length}</Text>
        </View>
      </View>

      {/* EMPTY STATE */}
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={80} color="#ccc" />

          <Text style={styles.emptyTitle}>
            No Favorite Houses Yet
          </Text>

          <Text style={styles.emptySubtitle}>
            Tap ❤️ on any house to save it here
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* IMAGE (if naa image field) */}
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.image} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="home" size={30} color="#2E7D32" />
                </View>
              )}

              {/* INFO */}
              <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.name}
                </Text>

                <Text style={styles.location} numberOfLines={1}>
                  📍 {item.location || "No location"}
                </Text>

                <Text style={styles.price}>{item.price}</Text>
              </View>

              {/* ACTION */}
              <TouchableOpacity
                onPress={() => toggleFavorite(item)}
                style={styles.heartBtn}
              >
                <Ionicons name="heart" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    padding: 15,
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
  },

  counter: {
    backgroundColor: "#2E7D32",
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },

  counterText: {
    color: "#fff",
    fontWeight: "bold",
  },

  /* EMPTY */
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },

  emptySubtitle: {
    color: "gray",
    marginTop: 5,
    textAlign: "center",
    paddingHorizontal: 20,
  },

  /* CARD */
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 15,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },

  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },

  location: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
  },

  price: {
    marginTop: 5,
    fontWeight: "bold",
    color: "#2E7D32",
  },

  heartBtn: {
    backgroundColor: "#E53935",
    padding: 10,
    borderRadius: 10,
  },
});