// import { StyleSheet, Text, View } from 'react-native'
// import React, { useContext } from 'react'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import OnboardingScreen from '../screens/OnboardingScreen';
// import LoginScreen from '../screens/LoginScreen';
// import ChangePasswordScreen from '../screens/ChangePasswordScreen';
// import { AuthContext } from '../context/AuthContext';
// import AppStack from './AppStack';

// const Stack = createNativeStackNavigator();

// const AuthStack = () => {
//   const { userToken, changePassword } = useContext(AuthContext);
  
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {userToken === null ? (
//         <Stack.Screen name="Login" component={LoginScreen} />
//       ) : (
        //  !changePassword ? (
//           <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
//         ) : (
//           <></>
//         )
//       )}
//     </Stack.Navigator>
//   );
// }

// export default AuthStack;

// const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        {/* <Stack.Screen name="Onboarding" component={OnboardingScreen} /> */}
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({})