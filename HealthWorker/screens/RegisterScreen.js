import { StyleSheet, Text, View ,SafeAreaView,Pressable,Image,KeyboardAvoidingView,TextInput, Alert} from 'react-native'
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    const handleRegister= () => {
        const user = {
            name: name,
            email: email,
            password: password
        };
        Alert.alert("Name " + name + "Email " + email + "Password " + password);
        Alert.alert("Name " + name + "Email " + email + "Password " + password);
        // console.log("Name " + name + "Email " + email + "Password " + password);
        // axios.post("htttp://localhost:8080/register", user).then((response) => {
        //     console.log(response);
        //     Alert.alert("Registration Successful!");
        //     setName
        // }).catch((error)=>{
        //     Alert.alert("Registration Failure");
        //     console.log("Registration Failure",error);
        // })
      }
  return (
    <SafeAreaView
    style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
  >

    <View>
      <Image
        style={{ width: 150, height: 150 }}
        source={require("../assets/logo.png")}
      />
    </View>


    <KeyboardAvoidingView>
        {/* Register to Your Account */}
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#007FFF" }}>
          Register to Your Account
        </Text>
      </View>
    
        {/* Name      */}
    <View style={{ marginTop: 10 }}>
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
          <AntDesign style={{marginLeft:8}} name="user" size={24} color="gray" />
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={{
              color: "gray",
              marginVertical: 10,
              width: 280,
              fontSize: 16,
            }}
            placeholder="Enter your Name"
          />
        </View>
      </View>

      {/* Email */}
      <View style={{ marginTop: 10 }}>
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
          <MaterialIcons
            style={{ marginLeft: 10 }}
            name="email"
            size={24}
            color="gray"
          />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={{
              color: "gray",
              marginVertical: 10,
              width: 280,
              fontSize: 16,
            }}
            placeholder="Enter your Email"
          />
        </View>
      </View>

       {/* Password      */}
      <View style={{ marginTop: 10 }}>
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
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            style={{
              color: "gray",
              marginVertical: 10,
              width: 280,
              fontSize: 16,
            }}
            placeholder="Enter your Password"
          />
        </View>
      </View>

      {/* Forgot Password */}
      <View
        style={{
          marginTop: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#007FFF", fontWeight: "500" }}>
          Forgot Password?
        </Text>
      </View>

      {/* Register Button */}
      <View style={{ marginTop: 80 }}>
        <Pressable
        onPress={handleRegister}
          style={{
            width: 200,
            backgroundColor: "#007FFF",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Register
          </Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{ marginTop: 15 }}
      >
        <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
          Already have an Account? <Text style={{color:"#007FFF",fontWeight:500}}>Sign In</Text>
        </Text>
      </Pressable>
    </KeyboardAvoidingView>
  </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})