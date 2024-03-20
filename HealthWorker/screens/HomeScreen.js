import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Table from '../components/Table'
import { useNavigation } from "@react-navigation/native";
const HomeScreen = () => {
  const navigate = useNavigation();
  const handleMissedFollowUps = () => {
    navigate.replace("MissedFollowUps")  }
  return (
    <ScrollView >
      <View className="flex-1 items-center justify-center" style={{marginTop:10}}> 
          <Image
            classname="h-40 w-40 "
            style={{ width: 100, height: 100 }}
            source={require("../assets/logo.png")}
          />
      </View>
      <View className="flex-row justify-between p-4 m-10">
        <Pressable className="bg-blue-400 p-4 border border-blue-950 "><Text className="">Register Patient</Text></Pressable>
        <Pressable onPress={handleMissedFollowUps} className="bg-blue-400 p-4 border border-blue-950 "><Text>Missed FollowUps</Text></Pressable>
      </View>
      <View className="justify-center items-center"><Text className="font-bold text-2xl ">Today's Schedule</Text></View>
      <Table/>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})