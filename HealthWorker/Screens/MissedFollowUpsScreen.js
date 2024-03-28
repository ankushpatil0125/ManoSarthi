import { ScrollView, StyleSheet, Text, View,Image, Pressable} from 'react-native'
import React from 'react'
import Table from '../components/Table'
const MissedFollowUpsScreen = () => {
  return (
    <ScrollView>
      <View className="flex-1 items-center justify-center" style={{marginTop:10}}> 
          <Image
            classname="h-40 w-40 "
            style={{ width: 100, height: 100 }}
            source={require("../assets/logo.png")}
          />
      </View>
      <View className="justify-center items-center"><Text className="font-bold text-2xl ">Missed FollowUps</Text></View>
      <Table/>
    </ScrollView>
  )
}

export default MissedFollowUpsScreen

const styles = StyleSheet.create({})