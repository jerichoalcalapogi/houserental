import { createContext } from "react";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
});

export const FavoritesContext = createContext({
  favorites: [],
  toggleFavorite: () => {},
});

export const RentalsContext = createContext({
  rentals: [],
  addRental: () => {},
  removeRental: () => {},
});

export const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
});