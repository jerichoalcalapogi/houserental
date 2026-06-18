import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

export default function RentalFormScreen({ route, navigation }) {
  const { house } = route.params || {};

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [rentalDuration, setRentalDuration] = useState("");

  // 📅 DATE PICKER STATES
  const [moveInDate, setMoveInDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // 💰 PRICE CALCULATION
  const basePrice = parseInt(house?.price?.replace(/\D/g, "")) || 0;
  const totalPrice = rentalDuration ? basePrice * parseInt(rentalDuration) : 0;

  const handleConfirmRental = () => {
    if (!house) {
      Alert.alert("Error", "House data is missing.");
      return;
    }

    if (!fullName || !email || !contactNumber || !rentalDuration) {
      Alert.alert("Incomplete Form", "Please fill out all fields.");
      return;
    }

    navigation.navigate("Receipt", {
      house,
      renter: {
        fullName,
        email,
        contactNumber,
        moveInDate: moveInDate.toDateString(),
        rentalDuration,
        totalPrice
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Rental Information</Text>

      <Text style={styles.houseName}>{house?.name}</Text>
      <Text style={styles.price}>Monthly: {house?.price}</Text>

      {/* INPUTS */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
      />

      {/* 📅 DATE PICKER */}
      <TouchableOpacity
        style={styles.dateBox}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>
          Move-in Date: {moveInDate.toDateString()}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={moveInDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setMoveInDate(selectedDate);
          }}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Rental Duration (Months)"
        value={rentalDuration}
        onChangeText={setRentalDuration}
        keyboardType="numeric"
      />

      {/* 💰 AUTO TOTAL */}
      {rentalDuration ? (
        <Text style={styles.total}>
          Total Price: ₱{totalPrice}
        </Text>
      ) : null}

      {/* BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleConfirmRental}
      >
        <Text style={styles.buttonText}>Confirm Rental</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 20
  },

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10
  },

  houseName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32"
  },

  price: {
    marginBottom: 20,
    color: "#666"
  },

  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },

  dateBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },

  dateText: {
    color: "#333"
  },

  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2E7D32"
  },

  button: {
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  }
});