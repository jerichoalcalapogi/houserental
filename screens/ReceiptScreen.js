import React, { useRef, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { FavoritesContext } from "../AppContext";
import { RentalsContext } from "../AppContext";

export default function ReceiptScreen({ route }) {
  const { house, renter } = route.params;

  const viewRef = useRef();
  const [loading, setLoading] = useState(false);

  const { addRental } = useContext(RentalsContext);

  const saveReceipt = async () => {
    try {
      setLoading(true);

      if (!house || !renter) {
        Alert.alert("Error", "Missing data");
        return;
      }

      const available = await Sharing.isAvailableAsync();
      if (!available) {
        Alert.alert("Error", "Sharing not available");
        return;
      }

      const uri = await captureRef(viewRef, {
        format: "png",
        quality: 1,
      });

      await Sharing.shareAsync(uri, {
        mimeType: "image/png",
        dialogTitle: "Receipt",
      });

      // 🔥 AUTO SAVE TO RENTALS
      addRental(house, renter);

      Alert.alert("Success", "Saved to Gallery + My Rentals 🏠");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to save receipt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View ref={viewRef} collapsable={false} style={styles.receipt}>
        <Text style={styles.title}>HOUSE RENTAL RECEIPT</Text>

        <Text style={styles.section}>House Information</Text>
        <Text style={styles.text}>House: {house?.name}</Text>
        <Text style={styles.text}>Location: {house?.location}</Text>
        <Text style={styles.text}>Rent: {house?.price}</Text>
        <Text style={styles.text}>Bedrooms: {house?.bedrooms}</Text>
        <Text style={styles.text}>Bathrooms: {house?.bathrooms}</Text>

        <View style={styles.divider} />

        <Text style={styles.section}>Tenant Information</Text>
        <Text style={styles.text}>Name: {renter?.fullName}</Text>
        <Text style={styles.text}>Email: {renter?.email}</Text>
        <Text style={styles.text}>Contact: {renter?.contactNumber}</Text>
        <Text style={styles.text}>Move-in Date: {renter?.moveInDate}</Text>
        <Text style={styles.text}>Duration: {renter?.rentalDuration}</Text>

        <View style={styles.divider} />

        <Text style={styles.confirmation}>✓ Rental Confirmed</Text>
        <Text style={styles.footer}>Thank you for choosing us.</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={saveReceipt}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Saving..." : "Save Receipt"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 20,
  },

  receipt: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    elevation: 4,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2E7D32",
  },

  section: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    marginBottom: 6,
    color: "#555",
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginVertical: 15,
  },

  confirmation: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
  },

  footer: {
    textAlign: "center",
    marginTop: 10,
    color: "#666",
  },

  button: {
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});