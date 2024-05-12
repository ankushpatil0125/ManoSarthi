import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, AppState } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./src/context/AuthContext";
import AppNav from "./src/navigation/AppNav";
import { LanguageProvider } from "./src/context/LanguageProvider";
import * as LocalAuthentication from "expo-local-authentication";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});


const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
 useEffect(() => {
    authenticate();
    // Add event listener for app state changes
    AppState.addEventListener("change", handleAppStateChange);
    // Cleanup function
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === "active" && !authenticated) {
      // App is coming to foreground and not authenticated, prompt for authentication
      authenticate();
    }
  };

  const authenticate = async () => {
    try {
      while (!authenticated) {
        const { success } = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate to access the app.',
          disableDeviceFallback: true,
          cancelLabel: 'Try Again',
        });
        if (success) {
          console.log("Biometric authentication successful");
          setAuthenticated(true);
          break
        } else {
          console.log("Biometric authentication failed");
          setAuthenticated(false);
        }
      }
    } catch (error) {
      console.error("Biometric authentication error:", error);
    }
  };

  return (
    <AuthProvider>
    {/* {(authenticated )? */}
      <LanguageProvider>
        <AppNav />
      </LanguageProvider>
    {/* :null} */}
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
