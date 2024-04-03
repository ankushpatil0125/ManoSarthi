import React from "react";
import {
  Button,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Card } from "react-native-paper";

const ReferNotRefer = () => {
  const navigation = useNavigation();

  const handleReferPress = () => {
    navigation.navigate("MedicalDetails");
  };

  const handleNotReferPress = () => {
    navigation.navigate("Preview");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 20 }}>Yes/No Count : </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          marginTop:50
        }}
      >
        <Text style={{fontSize:20}}>Yes : 8</Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={{fontSize:20}}>No : 2</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={handleReferPress}>
          <Card
            style={{
              margin: 50,
              width: 150,
              height: 150,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card.Content>
              <Text style={{ fontSize: 25 }}>Refer</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNotReferPress}>
          <Card
            style={{
              margin: 50,
              width: 150,
              height: 150,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card.Content>
              <Text style={{ fontSize: 25 }}>Not Refer</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReferNotRefer;
