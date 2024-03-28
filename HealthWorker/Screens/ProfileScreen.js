import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity} from 'react-native'
import React from 'react'

const ProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={require('../assets/logo.png')}
          style={{ width: 150, height: 150, borderRadius: 75, marginBottom: 20 }}
        />
        <Image
          source={require('../assets/avatar.png')}
          style={{ width: 150, height: 150, borderRadius: 75, marginBottom: 20 }}
        />
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>John Doe</Text>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>Health Worker</Text>

        <TouchableOpacity style={{ backgroundColor: '#2196F3', padding: 10, borderRadius: 5, marginBottom: 20 }}>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>Message</Text>
        </TouchableOpacity>
        <View style={{ width: '100%', backgroundColor: '#f0f0f0', padding: 20, borderRadius: 10, marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>About Me</Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget risus porta, tincidunt turpis at, fermentum nulla. Phasellus pretium velit vel ex fermentum aliquet.
          </Text>
        </View>
        <View style={{ width: '100%', backgroundColor: '#f0f0f0', padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Age</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})