import 'react-native-gesture-handler';
import { StyleSheet} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import { LanguageProvider } from './src/context/LanguageProvider';
import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
  default: "native",
});
const App =()=>{
  // verifyInstallation();
  return (
    <AuthProvider>
      <LanguageProvider>
      <AppNav/>
    </LanguageProvider>
    </AuthProvider>
  );
}

// const Home = ()=>{
//   return(
//     <SafeAreaView style={{flex:1,alignItems:'center',justifyContent:'center'}}>
//       <View>
//         <Text>Home</Text>
//       </View>
//     </SafeAreaView>
//   );
// }
const styles = StyleSheet.create({

});

export default App;