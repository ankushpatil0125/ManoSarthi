import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
  TextInput, // Import TextInput
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SelectService from "../Services/DatabaseServices/SelectService";
import PrescriptionModal from "../components/PrescriptionModal"; // Import the modal component
import i18n from "../../i18n";
import { useLanguageContext } from "../context/LanguageProvider";

const PrescriptionScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState(""); // State to hold search text
  const [selectedPrescription, setSelectedPrescription] = useState(null); // State to track selected prescription
  const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  const languageContext = useLanguageContext(); // Accessing the entire language context

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
      console.error("Error fetching data from database(PrescriptionScreen):", error);
    }
  };

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  const handleShowPrescription = (aabhaId) => {};

  const searchFilterFunction = (text) => {
    setSearchText(text); // Update search text state
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.patient_fname
          ? item.patient_fname.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  const openModal = (prescription) => {
    setSelectedPrescription(prescription);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textFriends}>{i18n.t("Search Prescription")}</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Patient Name "
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
            <TouchableHighlight
              key={index}
              style={styles.itemContainer}
              onPress={() => openModal(item)}
            >
              <View style={styles.card}>
                <Text style={styles.textName}>
                  {item.patient_fname} {item.patient_lname}
                </Text>
              </View>
            </TouchableHighlight>
          );
        })}
      </ScrollView>
      {selectedPrescription && (
        <PrescriptionModal
          visible={modalVisible}
          closeModal={closeModal}
          prescription={selectedPrescription}
        />
      )}
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
