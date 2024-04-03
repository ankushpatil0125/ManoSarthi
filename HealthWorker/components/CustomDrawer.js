import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#87CEEB" }}
      >
        <Image
          style={{
            height: 80,
            width: 80,
            borderRadius: 40,
            marginBottom: 10,
            marginHorizontal: 10,
          }}
          source={require("../assets/profile.png")}
        />
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            marginBottom: 10,
            marginHorizontal: 10,
          }}
        >
          John Doe
        </Text>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <Pressable
          onPress={() => {}}
          style={{ paddingVertical: 15, borderColor: "#87CEEB" }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="sync" size={24} color="black" />
            <Text style={{ fontSize: 15, marginLeft: 5 }}>Sync</Text>
          </View>
        </Pressable>
      </View>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <Pressable
          onPress={() => {}}
          style={{ paddingVertical: 15, borderColor: "#87CEEB" }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="language" size={24} color="black" />
            <Text style={{ fontSize: 15, marginLeft: 5 }}>Change Language</Text>
          </View>
        </Pressable>
      </View>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="logout" size={24} color="black" />
            <Text style={{ fontSize: 15, marginLeft: 5 }}>Signout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
