import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings ⚙️</Text>

      {/* ACCOUNT SECTION */}
      <Text style={styles.sectionTitle}>Account</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="person-circle-outline" size={22} />
          <Text style={styles.label}>Profile</Text>
        </View>
      </View>

      {/* APP SETTINGS */}
      <Text style={styles.sectionTitle}>App Settings</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="notifications-outline" size={22} />
          <Text style={styles.label}>Notifications</Text>

          <Switch
            value={notifications}
            onValueChange={setNotifications}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Ionicons name="moon-outline" size={22} />
          <Text style={styles.label}>Dark Mode</Text>

          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Ionicons name="location-outline" size={22} />
          <Text style={styles.label}>Location Access</Text>

          <Switch
            value={location}
            onValueChange={setLocation}
          />
        </View>
      </View>

      {/* ABOUT SECTION */}
      <Text style={styles.sectionTitle}>About</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="information-circle-outline" size={22} />
          <Text style={styles.label}>App Version 1.0.0</Text>
        </View>
      </View>
    </ScrollView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 15,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#666",
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  label: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
});