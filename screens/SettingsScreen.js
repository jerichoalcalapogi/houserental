import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet
} from "react-native";

export default function SettingsScreen() {
  const [notifications,setNotifications] =
    useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Settings
      </Text>

      <View style={styles.row}>
        <Text>Notifications</Text>

        <Switch
          value={notifications}
          onValueChange={setNotifications}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20
  },
  title:{
    fontSize:24,
    fontWeight:"bold",
    marginBottom:20
  },
  row:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  }
});