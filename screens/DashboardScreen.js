import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Text,
  StatusBar,
} from "react-native";

import houses from "../data/houses";
import HouseCard from "../components/HouseCard";

export default function DashboardScreen({ navigation }) {
  const [search, setSearch] = useState("");

  const filteredHouses = houses.filter((house) =>
    house.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderHouse = ({ item }) => (
    <HouseCard
      house={item}
      onPress={() =>
        navigation.navigate("HouseDetails", { house: item })
      }
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f6f8" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Find Your Home 🏡</Text>
        <Text style={styles.subtitle}>Discover best rental places</Text>
      </View>

      {/* SEARCH */}
      <TextInput
        placeholder="Search house, location..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      {/* LIST */}
      <FlatList
        data={filteredHouses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderHouse}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    paddingHorizontal: 15,
    paddingTop: 10, // 🔥 moves everything UP
  },

  header: {
    marginBottom: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1B5E20",
  },

  subtitle: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },

  searchInput: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 10,
    marginBottom: 12,

    fontSize: 15,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },

  listContent: {
    paddingBottom: 20,
  },
});