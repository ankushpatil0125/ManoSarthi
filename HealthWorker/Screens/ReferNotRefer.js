import React from 'react';
import { Button, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc'

const ReferNotRefer = () => {
  const navigation = useNavigation();

  const handleReferPress = () => {
    navigation.navigate('MedicalDetails');
  };
  const handleNotReferPress = () => {
    navigation.navigate('Preview');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', paddingTop: 10 }}>
        <Image
          source={require('../assets/saarthi.png')}
          style={{ borderRadius: 8, width: 85, height: 85, borderColor: 'black', borderWidth: 0.8 }}
        />
      </View>
      <View style={tw`pb-30 pl-10`}>
         <Text style={tw`text-3xl`}>Count: </Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <View style={{paddingBottom: '30%', flexDirection: 'row', justifyContent: 'space-between', width: '50%' }}>
         
         {/* <View> */}
          <TouchableOpacity
            onPress={handleReferPress}
            style={{ backgroundColor: 'lightblue', padding: 20, borderRadius: 10 }}
          >
            <Text style={{ fontSize: 35 }}>Refer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNotReferPress}
            style={{ backgroundColor: 'lightblue', padding: 20, borderRadius: 10 }}
          >
            <Text style={{ fontSize: 35 }}>Not Refer</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ paddingBottom: 35, width: 100, paddingLeft: 25 }}>
        <Button title="Back" onPress={() => console.log('Button 2 pressed')} />
      </View>
    </SafeAreaView>
  );
};

export default ReferNotRefer;