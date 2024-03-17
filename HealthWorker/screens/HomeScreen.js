import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  SafeAreaView,
  Image,
} from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
// import {SliderBox} from "react-native-image-slider-box";


const HomeScreen = () => {
  const list = [
    {
      id: "0",
      image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
      name: "Home",
    },
    {
      id: "1",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
      name: "Deals",
    },
    {
      id: "3",
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
      name: "Electronics",
    },
    {
      id: "4",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
      name: "Mobiles",
    },
    {
      id: "5",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
      name: "Music",
    },
    {
      id: "6",
      image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
      name: "Fashion",
    },
  ];
  return (
    <SafeAreaView
      style={{
        padding: Platform.OS === "android" ? 0 : 0,
        flex: 1,
        backgroundColor: "white",
        marginTop:40
      }}
    >
      <ScrollView>
        <View style={{backgroundColor:"#00CED1",padding:10,flexDirection:"row",alignItems:"center"}}>
          <Pressable style={{flexDirection:"row",alignItems:"center",marginHorizontal:7,gap:10,backgroundColor:"white",borderRadius:3,height:38,flex:1}}>
            <EvilIcons style={{paddingLeft:10}}name="search" size={24} color="black" />
            <TextInput placeholder="Search" />
          </Pressable>

          <Feather name="mic" size={24} color="black" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item,index)=>(
              <Pressable key={index} style={{marginHorizontal:30,justifyContent:"center",alignItems:"center"}}>
                <Image source={{uri:item?.image}} style={{width:50,height:50}}/>
                <Text style={{textAlign:"center",fontSize:12,fontWeight:"500",marginTop:5}}>{item?.name}</Text>
              </Pressable>
              
            ))}
        </ScrollView>
                {/* <SliderBox
          images={images}
          autoPlay
          circleLoop
          dotColor={"#13274F"}
          inactiveDotColor={"#90A4AE"}
          ImageComponentStyle={{ width: "100%" }}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

