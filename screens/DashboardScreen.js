import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Text,
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
        navigation.navigate("HouseDetails", {
          house: item,
        })
      }
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
     
      </Text>

      <TextInput
        placeholder="🔍 Search House..."
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

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
    padding: 15,
    backgroundColor: "#f4f6f8",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 15,
  },

  searchInput: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  listContent: {
    paddingBottom: 110,
  },
});