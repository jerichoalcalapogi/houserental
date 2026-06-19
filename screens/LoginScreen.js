import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function LoginScreen({ navigation }) {


  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");



  const handleLogin =()=>{


    if(!email || !password){

      Alert.alert(
        "Missing Information",
        "Please enter your email and password"
      );

      return;

    }



    Alert.alert(
      "Welcome Back 🏠",
      "Login Successful"
    );



    navigation.replace("Dashboard");


  };




return(


<View style={styles.container}>


{/* HEADER */}

<View style={styles.header}>


<Text style={styles.logo}>
🏡
</Text>


<Text style={styles.brand}>
HouseFinder
</Text>


<Text style={styles.subtitle}>
Find your perfect home today
</Text>



</View>





{/* LOGIN CARD */}

<KeyboardAvoidingView

behavior={
 Platform.OS==="ios"
 ? "padding"
 : undefined
}

style={styles.card}


>


<Text style={styles.title}>
Welcome Back
</Text>


<Text style={styles.description}>
Login to continue renting your dream house
</Text>





<View style={styles.inputBox}>


<Text style={styles.icon}>
📧
</Text>


<TextInput

placeholder="Email Address"

placeholderTextColor="#888"

style={styles.input}

value={email}

onChangeText={setEmail}

/>


</View>






<View style={styles.inputBox}>


<Text style={styles.icon}>
🔒
</Text>



<TextInput

placeholder="Password"

placeholderTextColor="#888"

secureTextEntry

style={styles.input}

value={password}

onChangeText={setPassword}

/>



</View>






<TouchableOpacity

style={styles.button}

onPress={handleLogin}

>


<Text style={styles.buttonText}>
LOGIN
</Text>


</TouchableOpacity>







<TouchableOpacity

onPress={()=>
navigation.navigate("Register")
}

>


<Text style={styles.register}>

Don't have an account?
<Text style={styles.link}>
 Register
</Text>

</Text>


</TouchableOpacity>




</KeyboardAvoidingView>





</View>



);


}





const styles = StyleSheet.create({



container:{


flex:1,

backgroundColor:"#2E7D32",

justifyContent:"center",

padding:20,


},




header:{


alignItems:"center",

marginBottom:30,


},




logo:{


fontSize:65,


},




brand:{


fontSize:34,

fontWeight:"bold",

color:"#fff",


},



subtitle:{


color:"#D0FFD6",

fontSize:15,

marginTop:5,


},





card:{


backgroundColor:"#fff",

borderRadius:25,

padding:25,


shadowColor:"#000",

shadowOpacity:0.15,

shadowRadius:10,

elevation:8,


},




title:{


fontSize:28,

fontWeight:"bold",

color:"#2E7D32",

textAlign:"center",


},




description:{


textAlign:"center",

color:"#777",

marginVertical:15,


},





inputBox:{


flexDirection:"row",

alignItems:"center",

backgroundColor:"#F5F5F5",

borderRadius:15,

paddingHorizontal:15,

marginBottom:15,


},




icon:{


fontSize:20,

marginRight:10,


},




input:{


flex:1,

paddingVertical:15,

fontSize:16,


},





button:{


backgroundColor:"#2E7D32",

padding:16,

borderRadius:15,

marginTop:10,


},





buttonText:{


color:"#fff",

fontWeight:"bold",

textAlign:"center",

fontSize:16,


},





register:{


textAlign:"center",

marginTop:20,

color:"#777",

},




link:{


color:"#2E7D32",

fontWeight:"bold",


}



});