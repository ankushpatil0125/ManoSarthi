import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthContext } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import * as Location from 'expo-location';


const ForwardedToast = React.forwardRef((props, ref) => (
  <Toast ref={ref} {...props} />
));

const checkNetworkConnectivity = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  const [isConnected, setIsConnected] = useState(true);
  const [location, setLocation] = useState();
  const [locationAddress, setLocationAddress] = useState();


  // useEffect(() => {
  //   const getPermissions = async () => {
  //    let {status} = await Location.requestForegroundPermissionsAsync();
  //    if (status !== 'granted'){
  //      console.log("Please grant location permissions");
  //      return;
  //    }
  //    let currLocation = await Location.getCurrentPositionAsync({});
  //    setLocation(currLocation);
  //    console.log("Location: ", currLocation);
 
  //   } 
  //   getPermissions()

  //   const reverseGeocode = async () =>{
  //     const reverseGeocodeAddress = await Location.reverseGeocodeAsync({
  //       longitude: location.coords.longitude,
  //       latitude: location.coords.latitude
  //     });
  //     setLocationAddress(reverseGeocodeAddress);
  //     console.log("location address: ", locationAddress)
  //   }
  //   reverseGeocode()
  //  }, [])

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      const connected = await checkNetworkConnectivity();
      setIsConnected(connected);

      if (connected) {
        Toast.show({
          type: "success",
          text1: "Back online",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "You are offline now",
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <>
      <NavigationContainer>
        {userToken !== null ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
      <ForwardedToast />
    </>
  );
};

export default AppNav;
