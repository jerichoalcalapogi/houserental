import React, { createContext } from "react";

export const FavoritesContext = createContext({
  favorites: [],
  toggleFavorite: () => {},
});

export const RentalsContext = createContext({
  rentals: [],
  addRental: () => {},
  removeRental: () => {},
});