import React, { useState, useMemo, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FavoritesContext } from "../AppContext";
import { RentalsContext } from "../AppContext";
export default function RentalsScreen() {
  const { rentals, removeRental } = useContext(RentalsContext);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  /* 🔥 FILTER + SEARCH */
  const filteredRentals = useMemo(() => {
    return rentals
      .filter((item) => {
        if (filter === "All") return true;
        return item.status === filter;
      })
      .filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
      );
  }, [rentals, search, filter]);

  /* 🗑 DELETE RENTAL */
  const deleteRental = (id) => {
    removeRental(id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "#2E7D32";
      case "Completed":
        return "#1565C0";
      default:
        return "#999";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 My Rentals Hub</Text>

      {/* 🔍 SEARCH */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          placeholder="Search your rental..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* 🎯 FILTER */}
      <View style={styles.filterRow}>
        {["All", "Active", "Completed"].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setFilter(item)}
            style={[
              styles.filterBtn,
              filter === item && styles.filterActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === item && { color: "#fff" },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 📭 EMPTY STATE */}
      {filteredRentals.length === 0 ? (
        <View style={styles.emptyBox}>
          <Ionicons name="home-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>No Rentals Yet</Text>
          <Text style={styles.subText}>
            Your confirmed bookings will appear here automatically
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredRentals}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>

              {/* 🖼 IMAGE */}
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.image} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="home" size={28} color="#2E7D32" />
                </View>
              )}

              {/* INFO */}
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.houseName}>🏡 {item.name}</Text>
                <Text style={styles.price}>💰 {item.price}</Text>
                <Text style={styles.details}>
                  📅 {item.duration} month(s)
                </Text>

                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(item.status) },
                  ]}
                >
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>

              {/* DELETE */}
              <TouchableOpacity
                onPress={() => deleteRental(item.id)}
                style={styles.deleteBtn}
              >
                <Ionicons name="trash" size={20} color="#fff" />
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
    backgroundColor: "#F0F4F7",
    padding: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 10,
    color: "#1B5E20",
  },

  searchBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
  },

  searchInput: {
    marginLeft: 10,
    flex: 1,
  },

  filterRow: {
    flexDirection: "row",
    marginBottom: 15,
    gap: 10,
  },

  filterBtn: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#E0E0E0",
  },

  filterActive: {
    backgroundColor: "#2E7D32",
  },

  filterText: {
    fontSize: 12,
    fontWeight: "700",
  },

  emptyBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 10,
  },

  subText: {
    color: "#777",
    textAlign: "center",
    marginTop: 5,
    paddingHorizontal: 20,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 18,
    marginBottom: 12,
    elevation: 5,
    alignItems: "center",
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },

  imagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
  },

  houseName: {
    fontSize: 17,
    fontWeight: "bold",
  },

  price: {
    color: "#2E7D32",
    fontWeight: "700",
    marginTop: 4,
  },

  details: {
    marginTop: 6,
    color: "#555",
  },

  statusBadge: {
    marginTop: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  deleteBtn: {
    backgroundColor: "#D32F2F",
    padding: 12,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});