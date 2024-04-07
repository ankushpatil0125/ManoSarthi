import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
// import CartScreen from "../screens/CartScreen";
// import FavouriteScreen from "../screens/FavouriteScreen";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "#87CEEB" },
        tabBarInactiveTintColor: "#87CEEB",
        tabBarActiveTintColor: "8#7CEEB",
        // headerStyle:{ backgroundColor: "#87CEEB",}
      }}
    >
      <Tab.Screen
        name="Home2"
        component={HomeScreen}
        options={{
        //   tabBarStyle:{display: getTabBarVisibility(route)},  
          tabBarIcon: () => <Entypo name="home" size={20} color="black" />,
        }}
      />
      {/* <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: () => (
            <Entypo name="shopping-cart" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{
          tabBarIcon: (color,size) => (
<MaterialIcons name="favorite-outline" size={24} color={color} />          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};
// const getTabBarVisibility= (route) =>{
// console.log(route)
// }
export default TabNavigation;

const styles = StyleSheet.create({});
