import React from "react";
import { ImageBackground, StyleSheet } from "react-native";


export default function AuthBackground({children}){

  return (

    <ImageBackground

      source={require("../assets/background.jpg")}

      style={styles.background}

      resizeMode="cover"

    >

      {children}

    </ImageBackground>

  );

}


const styles = StyleSheet.create({

  background:{

    flex:1

  }

});