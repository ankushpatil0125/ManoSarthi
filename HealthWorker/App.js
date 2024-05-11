import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { AuthProvider } from "./src/context/AuthContext";
import AppNav from "./src/navigation/AppNav";
import { LanguageProvider } from "./src/context/LanguageProvider";
import { NativeWindStyleSheet } from "nativewind";
NativeWindStyleSheet.setOutput({
  default: "native",
});
const App = () => {
  // verifyInstallation();
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppNav />
      </AuthProvider>
    </LanguageProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
