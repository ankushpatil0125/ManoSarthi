import React, { useContext,useState,useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthContext } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";
// import { getToken } from "../src/utils/Constants";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

const ForwardedToast = React.forwardRef((props, ref) => (
  <Toast ref={ref} {...props} />
));

const checkNetworkConnectivity = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};

const AppNav =  () => {
  const { isLoading, userToken, changePassword} = useContext(AuthContext);
  const [isConnected, setIsConnected] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [syncButton, setsyncButton] = useState(true);
  

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
  }, []);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  // const token = await getToken();
  // console.log("userToken: ", token);
  console.log("userToken: ", userToken);
  // console.log('changePassword',changePassword)
  return (
    <NavigationContainer>
      {/* && changePassword !==false */}
      {(userToken !== null )  ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
