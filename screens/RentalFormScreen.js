import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

export default function RentalFormScreen({
  route,
  navigation
}) {
  const { house } = route.params;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [rentalDuration, setRentalDuration] = useState("");

  const handleConfirmRental = () => {
    if (
      !fullName ||
      !email ||
      !contactNumber ||
      !moveInDate ||
      !rentalDuration
    ) {
      Alert.alert(
        "Incomplete Form",
        "Please fill out all fields."
      );
      return;
    }

    navigation.navigate("Receipt", {
      house,
      renter: {
        fullName,
        email,
        contactNumber,
        moveInDate,
        rentalDuration
      }
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 30
      }}
    >
      <Text style={styles.heading}>
        Rental Information
      </Text>

      <Text style={styles.houseName}>
        {house.name}
      </Text>

      <Text style={styles.price}>
        {house.price}
      </Text>

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
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Move-in Date (MM/DD/YYYY)"
        value={moveInDate}
        onChangeText={setMoveInDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Rental Duration (Months)"
        value={rentalDuration}
        onChangeText={setRentalDuration}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleConfirmRental}
      >
        <Text style={styles.buttonText}>
          Confirm Rental
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 20
  },

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#222"
  },

  houseName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32"
  },

  price: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666"
  },

  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd"
  },

  button: {
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  }
});