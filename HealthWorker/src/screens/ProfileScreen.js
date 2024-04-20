import { StyleSheet, View, SafeAreaView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Title, Card, Paragraph, Button } from "react-native-paper";
import {
  AntDesign,
  Entypo,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import ProfileService from "../Services/ProfileService/ProfileService";
import { Text } from "react-native";

const ProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [village, setVillage] = useState("");

  useEffect(() => {
    const handleProfileDetails = async () => {
      try {
        const res = await ProfileService.getHealthWorkerData();
        setUsername(res?.user?.username);
        setFirstname(res?.firstname);
        setLastname(res?.lastname);
        setEmail(res?.email);
        setGender(res?.gender);
        setDistrict(res?.villagecode?.subDistrict?.district?.name);
        setSubdistrict(res?.villagecode?.subDistrict?.name);
        setVillage(res?.villagecode?.name);
      } catch (err) {
        console.log("err healthworker details", err);
      }
    };
    handleProfileDetails();
  }, []);

  const handleChangeDetails = () => {
    // Handle changing details here
    navigation.navigate("EditDetailsScreen");
  };
  const handleChangePassword = () => {
    navigation.navigate("ChangePassword1");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.parentCard}>
        <Card.Content>
          <View style={styles.userInfoSection}>
            <Avatar.Image
              source={require("../../src/assets/profile.png")}
              size={100}
              style={styles.avatar}
            />
            <Title style={styles.title}>{username}</Title>
          </View>
          <Card style={styles.detailCard}>
            <Card.Content>
              <View style={styles.detailContainer}>
                <AntDesign name="user" size={24} color="black" />
                <Paragraph style={styles.detailText}>
                  First Name: {firstname}
                </Paragraph>
              </View>
              <View style={styles.detailContainer}>
                <Entypo name="user" size={24} color="black" />
                <Paragraph style={styles.detailText}>
                  Last Name: {lastname}
                </Paragraph>
              </View>
              <View style={styles.detailContainer}>
                <Fontisto name="email" size={24} color="black" />
                <Paragraph style={styles.detailText}>Email: {email}</Paragraph>
              </View>
              <View style={styles.detailContainer}>
                <MaterialCommunityIcons
                  name="gender-male-female"
                  size={24}
                  color="black"
                />
                <Paragraph style={styles.detailText}>
                  Gender: {gender}
                </Paragraph>
              </View>
              <View style={styles.detailContainer}>
                <Entypo name="location-pin" size={24} color="black" />
                <Paragraph style={styles.detailText}>
                  District: {district}
                </Paragraph>
              </View>
              <View style={styles.detailContainer}>
                <Entypo name="location-pin" size={24} color="black" />
                <Paragraph style={styles.detailText}>
                  Sub District: {subdistrict}
                </Paragraph>
              </View>
              <View style={styles.detailContainer}>
                <Entypo name="location-pin" size={24} color="black" />
                <Paragraph style={styles.detailText}>
                  Village: {village}
                </Paragraph>
              </View>
              <View style={{ flexDirection: "row", gap: 50 }}>
                <Pressable style={styles.button} onPress={handleChangeDetails}>
                  <Text style={styles.buttonText}>Change Details</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleChangePassword}>
                  <Text style={styles.buttonText}>Change Password</Text>
                </Pressable>
              </View>
            </Card.Content>
          </Card>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    marginBottom: 20,
  },
  userInfoSection: {
    alignItems: "center",
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#777777",
  },
  parentCard: {
    marginBottom: 20,
    width: "90%",
    backgroundColor: "#ADDAF0", // Change card color here
  },
  detailCard: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DAE7ED",
  },
  button: {
    backgroundColor: "#87CEEB", // Button background color
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});
