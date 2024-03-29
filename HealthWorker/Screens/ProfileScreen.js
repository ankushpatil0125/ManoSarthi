import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity} from 'react-native'
import React from 'react'

const ProfileScreen = () => {
  return (
    <ScrollView>
      <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>John Doe</Text>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>Health Worker</Text>
      </View>
      <View style={{marginHorizontal:20}}>
      <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Name: </Text>
        </View>
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Age: </Text>
        </View>
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>DOB: </Text>
        </View>
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Email: </Text>
        </View>
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Address: </Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})