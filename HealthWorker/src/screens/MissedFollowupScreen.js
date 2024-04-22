import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import Table from "../components/Table";
const MissedFollowUpsScreen = () => {
  return (
    <ScrollView>
      <View
        style={{
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 25, marginBottom: 10 }}>
          Missed FollowUps
        </Text>
      </View>
      <Table />
    </ScrollView>
  );
};

export default MissedFollowUpsScreen;

const styles = StyleSheet.create({});
