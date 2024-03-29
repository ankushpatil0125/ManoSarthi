import React, { useEffect, useState } from 'react';
import { Button, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from 'twrnc'

const ReferNotRefer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [yesCount, setYesCount] = useState(0);

  useEffect(() => {
    if (route.params && route.params.answers) {
      const count = route.params.answers.reduce((acc, answer) => {
        if (answer === 'Yes') {
          return acc + 1;
        }
        return acc;
      }, 0);
      setYesCount(count);
    }
  }, [route.params]);

  const handleReferPress = () => {
    navigation.navigate('MedicalDetails');
  };
  const handleNotReferPress = () => {
    navigation.navigate('Preview');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', paddingTop: 20 }}>
        <Image
          source={require('../assets/saarthi.png')}
          style={{ borderRadius: 8, width: 120, height: 120, borderColor: 'black', borderWidth: 1 }}
        />
      </View>
      <View style={tw`items-center mb-8`}>
         <Text style={tw`text-2xl`}>Yes/No Count: {yesCount}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', maxWidth: 600 }}>
          <TouchableOpacity
            onPress={handleReferPress}
            style={{ backgroundColor: 'lightblue', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 10 }}
          >
            <Text style={{ fontSize: 24 }}>Refer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNotReferPress}
            style={{ backgroundColor: 'lightblue', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 10 }}
          >
            <Text style={{ fontSize: 24 }}>Not Refer</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ paddingBottom: 20, paddingHorizontal: 20, width: '100%', maxWidth: 600, alignSelf: 'center' }}>
        <Button title="Back" onPress={() => console.log('Button 2 pressed')} />
      </View>
    </SafeAreaView>
  );
};

export default ReferNotRefer;