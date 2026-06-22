
import React, { useState, useMemo, useEffect } from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* ================= CONTEXT ================= */
import { FavoritesContext, RentalsContext, UserContext, ThemeContext } from "./AppContext";

/* ================= SCREENS ================= */
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DashboardScreen from "./screens/DashboardScreen";
import HomeScreen from "./screens/HomeScreen";
import HouseDetailScreen from "./screens/HouseDetailScreen";
import RentalFormScreen from "./screens/RentalFormScreen";
import ReceiptScreen from "./screens/ReceiptScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import RentalsScreen from "./screens/RentalsScreen";
import AboutScreen from "./screens/AboutScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/* ================= ICONS ================= */
function getIcon(routeName, focused) {
  const icons = {
    Houses: ["home", "home-outline"],
    Favorites: ["heart", "heart-outline"],
    Rentals: ["clipboard", "clipboard-outline"],
    About: ["information-circle", "information-circle-outline"],
    Settings: ["settings", "settings-outline"],
  };

  const [active, inactive] = icons[routeName] || ["ellipse", "ellipse-outline"];
  return focused ? active : inactive;
}

/* ================= BOTTOM TABS ================= */
function BottomTabs() {
  const { favorites } = React.useContext(FavoritesContext);
  const { theme } = React.useContext(ThemeContext);
  const isDark = theme === "dark";

  const badgeCount =
    favorites.length > 99 ? "99+" : favorites.length || undefined;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 65,
          backgroundColor: isDark ? "#111827" : "#2E7D32",
          borderTopWidth: 0,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: isDark ? "#9CA3AF" : "#C8E6C9",
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={getIcon(route.name, focused)}
            size={size || 22}
            color={color}
          />
        ),
        tabBarBadge:
          route.name === "Favorites" ? badgeCount : undefined,
        tabBarBadgeStyle: {
          backgroundColor: "red",
          color: "white",
          fontSize: 10,
        },
      })}
    >
      <Tab.Screen name="Houses" component={DashboardScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Rentals" component={RentalsScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

/* ================= MAIN APP ================= */
export default function App() {
  const [favorites, setFavorites] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [theme, setTheme] = useState("light");

  /* ================= LOAD USER ================= */
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      setUserLoaded(false);

      const email = await AsyncStorage.getItem("currentUser");
      setCurrentUser(email);

      // RESET STATE FIRST (IMPORTANT FIX)
      setFavorites([]);
      setRentals([]);

      if (!email) {
        setLoading(false);
        setUserLoaded(true);
        return;
      }

      const fav = await AsyncStorage.getItem(`favorites_${email}`);
      const rent = await AsyncStorage.getItem(`rentals_${email}`);

      setFavorites(fav ? JSON.parse(fav) : []);
      setRentals(rent ? JSON.parse(rent) : []);

      setLoading(false);
      setUserLoaded(true);
    };

    loadUser();
  }, []);

  /* ================= SYNC WHEN USER CHANGES ================= */
  useEffect(() => {
    const syncUserData = async () => {
      setUserLoaded(false);

      if (!currentUser) {
        setFavorites([]);
        setRentals([]);
        setUserLoaded(true);
        return;
      }

      setFavorites([]);
      setRentals([]);

      const fav = await AsyncStorage.getItem(`favorites_${currentUser}`);
      const rent = await AsyncStorage.getItem(`rentals_${currentUser}`);

      setFavorites(fav ? JSON.parse(fav) : []);
      setRentals(rent ? JSON.parse(rent) : []);
      setUserLoaded(true);
    };

    syncUserData();
  }, [currentUser]);

  /* ================= SAVE FAVORITES ================= */
  useEffect(() => {
    if (!currentUser || !userLoaded) return;

    AsyncStorage.setItem(
      `favorites_${currentUser}`,
      JSON.stringify(favorites)
    );
  }, [favorites, currentUser, userLoaded]);

  /* ================= SAVE RENTALS ================= */
  useEffect(() => {
    if (!currentUser || !userLoaded) return;

    AsyncStorage.setItem(
      `rentals_${currentUser}`,
      JSON.stringify(rentals)
    );
  }, [rentals, currentUser, userLoaded]);

  /* ================= FAVORITES ================= */
  const toggleFavorite = (house) => {
    if (!house?.id) return;

    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === house.id);

      return exists
        ? prev.filter((item) => item.id !== house.id)
        : [...prev, house];
    });
  };

  /* ================= RENTALS ================= */
  const addRental = async (house, renter) => {
    if (!currentUser) return;

    const newRental = {
      id: Date.now(),
      name: house?.name || "Unknown",
      price: house?.price || "0",
      image: house?.image || "",
      duration: renter?.rentalDuration || 1,
      status: "Active",
      createdAt: new Date().toISOString(),
    };

    const updated = [newRental, ...rentals];
    setRentals(updated);
    await AsyncStorage.setItem(`rentals_${currentUser}`, JSON.stringify(updated));
  };

  /* ================= REMOVE RENTAL ================= */
  const removeRental = async (id) => {
    if (!currentUser) return;

    const updated = rentals.filter((item) => item.id !== id);
    setRentals(updated);
    await AsyncStorage.setItem(`rentals_${currentUser}`, JSON.stringify(updated));
  };

  /* ================= CONTEXT ================= */
  const favoritesValue = useMemo(
    () => ({ favorites, toggleFavorite }),
    [favorites]
  );

  const rentalsValue = useMemo(
    () => ({ rentals, addRental, removeRental }),
    [rentals]
  );

  const themeValue = useMemo(
    () => ({ theme, setTheme }),
    [theme]
  );

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("themeMode");
      setTheme(savedTheme === "dark" ? "dark" : "light");
    };

    loadTheme();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("themeMode", theme);
  }, [theme]);

  if (loading) return null;

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <FavoritesContext.Provider value={favoritesValue}>
        <RentalsContext.Provider value={rentalsValue}>
          <ThemeContext.Provider value={themeValue}>
            <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{
                headerStyle: { backgroundColor: theme === "dark" ? "#111827" : "#2E7D32" },
                headerTintColor: "#fff",
                headerTitleStyle: { fontWeight: "bold" },
                headerShadowVisible: false,
              }}
            >
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Dashboard" component={BottomTabs} />
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="HouseDetails" component={HouseDetailScreen} />
              <Stack.Screen name="RentalForm" component={RentalFormScreen} />
              <Stack.Screen name="Receipt" component={ReceiptScreen} />
            </Stack.Navigator>
          </NavigationContainer>
          </ThemeContext.Provider>
        </RentalsContext.Provider>
      </FavoritesContext.Provider>
    </UserContext.Provider>
  );
}