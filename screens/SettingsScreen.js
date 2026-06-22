import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  Switch,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext, ThemeContext } from "../AppContext";

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState(true);
  const { setCurrentUser } = useContext(UserContext);
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    setDarkMode(theme === "dark");
  }, [theme]);

  const handleToggleDarkMode = (value) => {
    setDarkMode(value);
    setTheme(value ? "dark" : "light");
  };

  /* ================= PROFILE ================= */
  const [profileModal, setProfileModal] = useState(false);
  const [changePassModal, setChangePassModal] = useState(false);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [storedPassword, setStoredPassword] = useState("");

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const pickProfileImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      return Alert.alert(
        "Permission needed",
        "Please enable gallery access to choose a profile picture."
      );
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.length) {
      setProfilePic(result.assets[0].uri);
    }
  };

  // ✅ PUT IT HERE 👇👇👇
  useEffect(() => {
    const loadUser = async () => {
      try {
        const rawUser = await AsyncStorage.getItem("user");

        if (rawUser) {
          const user = JSON.parse(rawUser);

          setName(user.name || "");
          setContact(user.contact || "");
          setEmail(user.email || "");
          setStoredPassword(user.password || "");
          setProfilePic(user.profilePic || null);
        }
      } catch (err) {
        console.log("LOAD USER ERROR:", err);
      }
    };

    loadUser();
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    Alert.alert("Logout", "Do you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.multiRemove([
            "currentUser",
            "user",
            "isLoggedIn",
          ]);

          setCurrentUser(null);
          navigation.replace("Login");
        },
      },
    ]);
  };

  /* ================= SAVE PROFILE ================= */
  const saveProfile = async () => {
    const rawUser = await AsyncStorage.getItem("user");
    const currentUser = rawUser ? JSON.parse(rawUser) : {};

    const updatedUser = {
      ...currentUser,
      name,
      contact,
      email,
      password: storedPassword,
      profilePic,
    };

    await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
    await AsyncStorage.setItem("currentUser", email);

    setCurrentUser(email);
    setProfileModal(false);
    Alert.alert("Success", "Profile updated successfully");
  };

  /* ================= CHANGE PASSWORD (FIXED SECURITY) ================= */
  const handleChangePassword = async () => {
    if (!oldPass || !newPass || !confirmPass) {
      return Alert.alert("Error", "Please fill all fields");
    }

    const rawUser = await AsyncStorage.getItem("user");
    const currentUser = rawUser ? JSON.parse(rawUser) : {};
    const currentPassword = (currentUser.password || storedPassword || "").toString().trim();
    const enteredOldPass = oldPass.toString().trim();
    const enteredNewPass = newPass.toString().trim();
    const enteredConfirmPass = confirmPass.toString().trim();

    if (!currentPassword) {
      return Alert.alert("Error", "Unable to verify current password. Please log in again.");
    }

    if (enteredOldPass !== currentPassword) {
      return Alert.alert("Error", "Old password is incorrect");
    }

    if (enteredNewPass !== enteredConfirmPass) {
      return Alert.alert("Error", "Passwords do not match");
    }

    if (enteredNewPass === currentPassword) {
      return Alert.alert("Error", "New password must be different");
    }

    const updatedUser = {
      ...currentUser,
      name,
      contact,
      email,
      password: enteredNewPass,
    };

    await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
    await AsyncStorage.setItem("currentUser", email);

    setCurrentUser(email);
    setStoredPassword(enteredNewPass);
    setOldPass("");
    setNewPass("");
    setConfirmPass("");
    setChangePassModal(false);

    Alert.alert("Success", "Password updated successfully");
  };

  const isDark = theme === "dark";
  const screenStyles = {
    bg: { backgroundColor: isDark ? "#0F172A" : "#F4F6F8" },
    card: { backgroundColor: isDark ? "#1F2937" : "#fff" },
    text: { color: isDark ? "#F8FAFC" : "#333" },
    subtext: { color: isDark ? "#CBD5E1" : "#555" },
    title: { color: isDark ? "#F8FAFC" : "#1B5E20" },
    section: { color: isDark ? "#A5B4FC" : "#2E7D32" },
    divider: { backgroundColor: isDark ? "#334155" : "#E0E0E0" },
    input: { backgroundColor: isDark ? "#111827" : "#F6F7F8", borderColor: isDark ? "#334155" : "#E0E0E0", color: isDark ? "#F8FAFC" : "#000" },
  };

  return (
    <View style={[{ flex: 1 }, screenStyles.bg]}>
      <ScrollView
        style={[styles.container, screenStyles.bg]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, screenStyles.title]}>Settings ⚙️</Text>

        {/* PROFILE */}
        <View style={[styles.profileCard, screenStyles.card]}>
          <TouchableOpacity
            style={[styles.avatar, { backgroundColor: isDark ? "#2563EB" : "#2E7D32" }]}
            onPress={pickProfileImage}
          >
            {profilePic ? (
              <Image source={{ uri: profilePic }} style={styles.avatarImage} />
            ) : (
              <Ionicons name="person" size={30} color="#fff" />
            )}
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <Text style={[styles.name, screenStyles.text]}>{name}</Text>
            <Text style={[styles.email, screenStyles.subtext]}>{email}</Text>
            <Text style={[styles.contact, screenStyles.subtext]}>{contact}</Text>
          </View>

          <TouchableOpacity onPress={() => setProfileModal(true)}>
            <Ionicons name="create-outline" size={18} color={isDark ? "#93C5FD" : "#2E7D32"} />
          </TouchableOpacity>
        </View>

        {/* SECURITY */}
        <Text style={styles.sectionTitle}>Security</Text>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => setChangePassModal(true)}
        >
          <Ionicons name="lock-closed-outline" size={20} />
          <Text style={styles.actionText}>Change Password</Text>
          <Ionicons name="chevron-forward" size={18} />
        </TouchableOpacity>

        {/* SETTINGS */}
        <Text style={styles.sectionTitle}>App Settings</Text>

<View style={[styles.card, screenStyles.card]}>
          <View style={styles.row}>
            <Ionicons name="notifications-outline" size={20} color={screenStyles.text.color} />
            <Text style={[styles.label, screenStyles.text]}>Notifications</Text>
            <Switch value={notifications} onValueChange={setNotifications} />
          </View>

          <View style={[styles.divider, screenStyles.divider]} />

          <View style={styles.row}>
            <Ionicons name="moon-outline" size={20} color={screenStyles.text.color} />
            <Text style={[styles.label, screenStyles.text]}>Dark Mode</Text>
            <Switch value={darkMode} onValueChange={handleToggleDarkMode} />
          </View>

          <View style={[styles.divider, screenStyles.divider]} />

          <View style={styles.row}>
            <Ionicons name="location-outline" size={20} color={screenStyles.text.color} />
            <Text style={[styles.label, screenStyles.text]}>Location</Text>
            <Switch value={location} onValueChange={setLocation} />
          </View>
        </View>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* PROFILE MODAL */}
      <Modal visible={profileModal} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <TextInput
              style={styles.input}
              placeholder="Edit name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Contact number"
              placeholderTextColor="#999"
              value={contact}
              onChangeText={setContact}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* PASSWORD MODAL */}
      <Modal visible={changePassModal} transparent animationType="slide">
        <View style={styles.modalBg}>








          
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Change Password</Text>

            <TextInput
              style={styles.input}
              placeholder="Old Password"
              secureTextEntry
              value={oldPass}
              onChangeText={setOldPass}
            />

            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPass}
              onChangeText={setNewPass}
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPass}
              onChangeText={setConfirmPass}
            />

            <TouchableOpacity style={styles.saveBtn} onPress={handleChangePassword}>
              <Text style={styles.saveText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setChangePassModal(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1B5E20",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#2E7D32",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 29,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  contact: {
    fontSize: 14,
    color: "#555",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: "#2E7D32",
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  actionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  label: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
  logoutBtn: {
    backgroundColor: "#D32F2F",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#F6F7F8",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 14,
    marginBottom: 14,
  },
  saveBtn: {
    backgroundColor: "#2E7D32",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 6,
  },
  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  cancel: {
    marginTop: 12,
    textAlign: "center",
    color: "#555",
    fontWeight: "600",
  },
});