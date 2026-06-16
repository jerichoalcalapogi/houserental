import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeScreen from "./screens/HomeScreen";
import DashboardScreen from "./screens/DashboardScreen";
import HouseDetailScreen from "./screens/HouseDetailScreen";
import RentalFormScreen from "./screens/RentalFormScreen";
import ReceiptScreen from "./screens/ReceiptScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import RentalsScreen from "./screens/RentalsScreen";
import AboutScreen from "./screens/AboutScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,

        tabBarStyle: {
          height: 70,
          backgroundColor: "#2E7D32",
          borderTopWidth: 0,

          elevation: 8,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },

        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#E8F5E9",

        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "bold",
          marginBottom: 5,
        },

        tabBarIcon: ({ focused, color }) => {
          let iconName;

          switch (route.name) {
            case "Houses":
              iconName = focused ? "home" : "home-outline";
              break;

            case "Favorites":
              iconName = focused ? "heart" : "heart-outline";
              break;

            case "Rentals":
              iconName = focused
                ? "clipboard"
                : "clipboard-outline";
              break;

            case "About":
              iconName = focused
                ? "information-circle"
                : "information-circle-outline";
              break;

            case "Settings":
              iconName = focused
                ? "settings"
                : "settings-outline";
              break;

            default:
              iconName = "ellipse";
          }

          return (
            <Ionicons
              name={iconName}
              size={22}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Houses"
        component={DashboardScreen}
        options={{
          title: "Houses",
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "Favorites",
        }}
      />

      <Tab.Screen
        name="Rentals"
        component={RentalsScreen}
        options={{
          title: "Rentals",
        }}
      />

      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: "About",
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2E7D32",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "House Rental" }}
        />

        <Stack.Screen
          name="Dashboard"
          component={BottomTabs}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="HouseDetails"
          component={HouseDetailScreen}
          options={{ title: "House Details" }}
        />

        <Stack.Screen
          name="RentalForm"
          component={RentalFormScreen}
          options={{ title: "Rental Form" }}
        />

        <Stack.Screen
          name="Receipt"
          component={ReceiptScreen}
          options={{ title: "Rental Receipt" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}