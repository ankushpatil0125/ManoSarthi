import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput, // Import TextInput
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SelectService from "../Services/DatabaseServices/SelectService";


const PrescriptionScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState(""); // State to hold search text

  // useEffect(() => {
  //   fetchData("https://randomuser.me/api/?results=30");
  // }, []);

  // const fetchData = async (url) => {
  //   try {
  //     const response = await fetch(url);
  //     const json = await response.json();
  //     setData(json.results);
  //     setFilteredData(json.results);
  //     console.log(json.results);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const fetchDataFromDatabase = async () => {
    try {
      const prescRes = await SelectService.selectAllPrescriptions();

      console.log(
        "[PrescriptionScreeen]Prescriptions Fetched From Database: ",
        prescRes
      );
      setData(prescRes);
      setFilteredData(prescRes);
    } catch (error) {
      console.error("Error fetching data from database(HomeScreen):", error);
    }
  };

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  const searchFilterFunction = (text) => {
    setSearchText(text); // Update search text state
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.name.first
          ? item.name.first.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textFriends}>Search Prescription</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter AabhaId "
          onChangeText={searchFilterFunction}
          value={searchText}
        />
      </View>
      <Text style={styles.textFriends}>
        {filteredData.length} Prescriptions Found
      </Text>
      <ScrollView>
        {filteredData.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Image
                source={{ uri: item.picture.large }}
                style={styles.image}
              />
              <View>
                <Text style={styles.textName}>
                  {item.name.first} {item.name.last}
                </Text>
                <Text style={styles.textEmail}>{item.login.username}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default PrescriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textFriends: {
    fontSize: 15,
    textAlign: "left",
    marginLeft: 10,
    fontWeight: "bold",
    marginTop: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textName: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: "600",
  },
  textEmail: {
    fontSize: 14,
    marginLeft: 10,
    color: "grey",
  },
  searchContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
