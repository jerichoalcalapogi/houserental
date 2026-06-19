import React, { useState, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import AuthBackground from "./components/AuthBackground";
/* ================= CONTEXT ================= */
import { FavoritesContext, RentalsContext } from "./AppContext";

/* ================= SCREENS ================= */
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

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


/* ================= ICONS ================= */
function getIcon(routeName, focused) {

  const icons = {

    Houses: ["home", "home-outline"],
    Favorites: ["heart", "heart-outline"],
    Rentals: ["clipboard", "clipboard-outline"],
    About: ["information-circle", "information-circle-outline"],
    Settings: ["settings", "settings-outline"],

  };


  const [active, inactive] =
    icons[routeName] || ["ellipse", "ellipse-outline"];


  return focused ? active : inactive;

}



/* ================= BOTTOM TABS ================= */
function BottomTabs(){

  const { favorites } = React.useContext(FavoritesContext);


  const badgeCount =
    favorites.length > 99
      ? "99+"
      : favorites.length || undefined;



  return(

    <Tab.Navigator

      screenOptions={({route}) => ({

        headerShown:false,


        tabBarStyle:{

          height:65,
          backgroundColor:"#2E7D32",
          borderTopWidth:0,
          paddingBottom:8,
          paddingTop:6,

        },


        tabBarActiveTintColor:"#fff",
        tabBarInactiveTintColor:"#C8E6C9",


        tabBarIcon:({focused,color,size})=>(

          <Ionicons

            name={getIcon(route.name,focused)}

            size={size || 22}

            color={color}

          />

        ),


        tabBarBadge:

          route.name==="Favorites"
          ? badgeCount
          : undefined,


        tabBarBadgeStyle:{

          backgroundColor:"red",
          color:"white",
          fontSize:10,

        },


      })}

    >


      <Tab.Screen 
        name="Houses"
        component={DashboardScreen}
      />


      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
      />


      <Tab.Screen
        name="Rentals"
        component={RentalsScreen}
      />


      <Tab.Screen
        name="About"
        component={AboutScreen}
      />


      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
      />


    </Tab.Navigator>


  );

}





/* ================= MAIN APP ================= */

export default function App(){


  const [favorites,setFavorites] = useState([]);

  const [rentals,setRentals] = useState([]);



  /* FAVORITES */

  const toggleFavorite = (house)=>{


    if(!house?.id) return;



    setFavorites(prev=>{


      const exists =
        prev.some(item=>item.id === house.id);



      if(exists){

        return prev.filter(
          item=>item.id !== house.id
        );

      }



      return [...prev,house];


    });


  };





  /* RENTALS */

  const addRental = (house,renter)=>{


    const newRental = {


      id:Date.now(),

      name:house.name,

      price:house.price,

      duration:renter.rentalDuration,

      status:"Active",

      createdAt:new Date().toISOString(),


    };



    setRentals(prev=>[
      newRental,
      ...prev
    ]);

  };





  const removeRental=(id)=>{


    setRentals(prev=>
      prev.filter(
        item=>item.id!==id
      )
    );


  };





  const favoritesValue = useMemo(

    ()=>({

      favorites,

      toggleFavorite,

    }),

    [favorites]

  );





  const rentalsValue = useMemo(

    ()=>({

      rentals,

      addRental,

      removeRental,

    }),

    [rentals]

  );







return(


<FavoritesContext.Provider value={favoritesValue}>


<RentalsContext.Provider value={rentalsValue}>


<NavigationContainer>


<Stack.Navigator


initialRouteName="Login"


screenOptions={{


headerStyle:{
backgroundColor:"#2E7D32"
},


headerTintColor:"#fff",


headerTitleStyle:{
fontWeight:"bold"
},


}}



>


{/* AUTH */}


<Stack.Screen

name="Login"

component={LoginScreen}

/>



<Stack.Screen

name="Register"

component={RegisterScreen}

/>





{/* MAIN */}


<Stack.Screen

name="Dashboard"

component={BottomTabs}

/>



<Stack.Screen

name="Home"

component={HomeScreen}

/>


<Stack.Screen

name="HouseDetails"

component={HouseDetailScreen}

/>


<Stack.Screen

name="RentalForm"

component={RentalFormScreen}

/>


<Stack.Screen

name="Receipt"

component={ReceiptScreen}

/>



</Stack.Navigator>



</NavigationContainer>



</RentalsContext.Provider>


</FavoritesContext.Provider>


);


}