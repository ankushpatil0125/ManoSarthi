import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Children, createContext, useEffect, useState } from "react";
import { BASE_URL, getToken } from "../utils/Constants";
import axios from "axios";
import { Alert } from "react-native";
import { createDatabase, fetchData } from "../Services/initService";
import DropService from "../Services/DatabaseServices/DropService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("JWT", value);
    } catch (e) {
    }
  };
  useEffect(()=>{
    const fetchToken = async () => {
      const fetchedToken = await getToken();
      setUserToken(fetchedToken);
      // setInitializing(false);
    };
    
    fetchToken();
  },[]);

  const login = async (username, password) => {
    // console.log("login");
    const user = {
      username: username,
      password: password,
    };
    console.log("Entered Credentials: ", user);
    try {
      setIsLoading(true);
      const response = await axios.post(BASE_URL + "auth/login", user);
      // console.log("response: ", response);
      if (response) {
        await storeData(response?.data?.jwtToken);
        const token = await getToken();
        setUserToken(token);
        // await DropService.dropTables();
        createDatabase().then((message) => {
          console.log(message);
        })
        .catch((message) => {
          console.log(message);
        });
        fetchData()
        .then((message) => {
          Alert.alert(message);
        })
        .catch((message) => {
          Alert.alert(message);
        });
        setIsLoading(false);
        console.log("Token", getToken());
      } else {
        Alert.alert("Login Failure");
      }
    } catch (error) {
      Alert.alert("Login Failure", "An error occurred during login.");
    }
    setIsLoading(false);
  };
  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("JWT");
    setIsLoading(false);
  };
  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem("JWT");
      setUserToken(userToken);
      setIsLoading(false);
    } catch (e) {
      console.log(`isLoggedIn error ${e}`);
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};
