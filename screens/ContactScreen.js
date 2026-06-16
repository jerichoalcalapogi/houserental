import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>

      <Text style={styles.item}>
        📞 +63 912 345 6789
      </Text>

      <Text style={styles.item}>
        ✉ support@houserental.com
      </Text>

      <Text style={styles.item}>
        📍 Cebu City, Philippines
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20
  },
  title:{
    fontSize:26,
    fontWeight:"bold",
    marginBottom:20
  },
  item:{
    fontSize:18,
    marginBottom:15
  }
});