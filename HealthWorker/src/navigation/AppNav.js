import React, { useContext, useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthContext } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";
import SyncDataService from "../Services/SyncDataService";

const ForwardedToast = React.forwardRef((props, ref) => (
  <Toast ref={ref} {...props} />
));

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext);
  const [isConnected, setIsConnected] = useState(true);
  const prevConnectedRef = useRef(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      const connected = state.isConnected;
      const prevConnected = prevConnectedRef.current;

      setIsConnected(connected);

      if (connected && !prevConnected) {
        // Only trigger sync if transitioning from offline to online
        Toast.show({
          type: "success",
          text1: "Back online",
        });
        SyncDataService.syncData();
      } else if (!connected && prevConnected) {
        Toast.show({
          type: "error",
          text1: "You are offline now",
        });
      }

      prevConnectedRef.current = connected; // Update previous state
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
