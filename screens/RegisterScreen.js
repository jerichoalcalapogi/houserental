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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ navigation }) {


  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");



 const handleRegister = async()=>{


if(!name || !email || !password){


Alert.alert(
"Missing Information",
"Please complete all fields"
);


return;

}





const user = {

name:name,

email:email,

password:password

};





await AsyncStorage.setItem(

"user",

JSON.stringify(user)

);





Alert.alert(

"Account Created 🎉",

"Registration Successful"

);



navigation.navigate("Login");



};


return(


<View style={styles.container}>



{/* HEADER */}

<View style={styles.header}>


<Text style={styles.logo}>
🏡
</Text>


<Text style={styles.brand}>
Join HouseFinder
</Text>


<Text style={styles.subtitle}>
Create your account and find your new home
</Text>



</View>







<KeyboardAvoidingView


behavior={
Platform.OS==="ios"
?"padding"
:undefined
}


style={styles.card}


>



<Text style={styles.title}>
Create Account
</Text>



<Text style={styles.description}>
Register to start renting houses easily
</Text>







<View style={styles.inputBox}>


<Text style={styles.icon}>
👤
</Text>


<TextInput

placeholder="Full Name"

placeholderTextColor="#888"

style={styles.input}

value={name}

onChangeText={setName}


/>


</View>







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


onPress={handleRegister}


>


<Text style={styles.buttonText}>

CREATE ACCOUNT

</Text>


</TouchableOpacity>







<TouchableOpacity

onPress={()=>
navigation.navigate("Login")
}

>


<Text style={styles.loginText}>


Already have an account?


<Text style={styles.link}>
 Login
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

marginBottom:25,


},




logo:{


fontSize:60,


},




brand:{


fontSize:30,

fontWeight:"bold",

color:"#fff",


},




subtitle:{


color:"#D0FFD6",

textAlign:"center",

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





loginText:{


textAlign:"center",

marginTop:20,

color:"#777",


},




link:{


color:"#2E7D32",

fontWeight:"bold",


},



});