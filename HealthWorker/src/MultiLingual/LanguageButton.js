import React, { useState } from "react";
import { TouchableOpacity, Text } from "react-native";

const LanguageToggleButton = ({ onPress, selectedLanguage }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{ fontSize: 16, fontWeight: "bold", marginHorizontal: 10}}>
        {selectedLanguage === "en" ? "EN" : "HI"}
      </Text>
    </TouchableOpacity>
  );
};

export default LanguageToggleButton;
