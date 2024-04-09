import {
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../context/AuthContext";
import LanguageToggleButton from "../MultiLingual/LanguageButton";
import { useLanguageContext } from "../context/LanguageProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import i18n from "../../i18n";
import tw from "twrnc";
import ChangePasswordService from "../Services/ChangePasswordService.js/ChangePasswordService";
import { Alert } from "react-native";
const ChangePasswordScreen = ({navigation}) => {
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [requestData,setRequestData]=useState({oldPassword:"",newPassword:""});
  const {setChangePassword} = useContext(AuthContext);
  // const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { selectedLanguage, handleLanguageToggle } = useLanguageContext(); // Accessing selectedLanguage and handleLanguageToggle from LanguageProvider
  const [isValid,setIsValid] = useState(false);
  
  const handleLogout = async () => {
    if (requestData.oldPassword.trim() === "" || requestData.newPassword.trim() === "") {
      Alert.alert("Please enter both old and new passwords");
      return;
    }
    setRequestData({
      oldPassword: passwordOld,
      newPassword: passwordNew
    });
    console.log('Requeste Data',requestData);          
    console.log("Old password", requestData.oldPassword, "New password", requestData.newPassword);
    try {
      if(!isValid){
      console.log(requestData)
        const response = await ChangePasswordService.ChangePassword(requestData);
        console.log("response of changePassword",response);

        if (response) {
          alert("Password Successfully Changed");
          // setLoading(false);
          // navigation.navigate("HomeScreen");
          setChangePassword(true);
          navigation.goBack();
        } else {
          Alert.alert("Failed");
        }
      }
      else{
        Alert.alert("Please enter a valid password");
      }
    } catch (error) {
      Alert.alert("Catch Error of Change Password",error.response);
        // setLoading(false);
    }
  };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={{
//         flex: 1,
//         backgroundColor: "white",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <ScrollView
//         contentContainerStyle={{
//           flexGrow: 1,
//           paddingHorizontal: 30,
//           paddingTop: 20,
//           paddingBottom: 30,
//           justifyContent: "center",
//         }}
//       >
//         {/* Language Toggle Button */}
//         <View
//           style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc",justifyContent: "center",alignItems:'center' }}
//         >
//           <LanguageToggleButton
//             onPress={handleLanguageToggle}
//             selectedLanguage={selectedLanguage}
//           />
//         </View>

//         {/* Login to Your Account */}
//         <View style={{ alignItems: "center" }}>
//           <Text style={{ fontSize: 17, fontWeight: "bold", color: "black" }}>
//             {i18n.t("Change Password")}
//           </Text>
//         </View>

        {/* Email */}
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <AntDesign
              style={{ marginLeft: 10 }}
              name="lock"
              size={24}
              color="gray"
            />
            <TextInput
              value={requestData.oldPassword}
              onChangeText={(text) => setRequestData({...requestData, oldPassword: text})}
              secureTextEntry={true}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 280,
                fontSize: 16,
              }}
              placeholder={i18n.t("Enter Your Old Password")}
            />
          </View>
        </View>

        {/* Password */}
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <AntDesign
              style={{ marginLeft: 10 }}
              name="lock"
              size={24}
              color="gray"
            />
            <TextInput
              value={requestData.newPassword}
              onChangeText={(text) => setRequestData({...requestData, newPassword: text})}
              secureTextEntry={true}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 280,
                fontSize: 16,
              }}
              placeholder={i18n.t("Enter Your New Password")}
            />
          </View>
        </View>

//         <View style={{ marginTop: 80 }}>
//           <Pressable
//             onPress={handleLogout}
//             style={{
//               width: 200,
//               backgroundColor: "#87CEEB",
//               borderRadius: 6,
//               marginLeft: "auto",
//               marginRight: "auto",
//               padding: 15,
//             }}
//           >
//             <Text
//               style={{
//                 textAlign: "center",
//                 color: "black",
//                 fontSize: 16,
//                 fontWeight: "bold",
//               }}
//             >
//               {i18n.t("Change Password")}
//             </Text>
//           </Pressable>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default ChangePasswordScreen;

const styles = StyleSheet.create({});


// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const ChangePasswordScreen = () => {
//   return (
//     <View>
//       <Text>ChangePasswordScreen</Text>
//     </View>
//   )
// }

// export default ChangePasswordScreen

// const styles = StyleSheet.create({})
