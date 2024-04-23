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

  const sample_data = [
    {
      "aabhaId": null,
      "date": "24-April-2024",
      "disease_code": [
        {
          "code": "F10282",
          "diseaseSubCategory": {
            "code": "F10",
            "diseaseCategory": {
              "code": "F10-F19",
              "name": "Mental and behavioral disorders due to psychoactive substance use"
            },
            "diseaseName": "Alcohol related disorders"
          },
          "shortDescription": "Alcohol dependence with alcohol-induced sleep disorder",
          "longDescription": "Alcohol dependence with alcohol-induced sleep disorder",
          "patient_count": 1
        },
        {
          "code": "F0150",
          "diseaseSubCategory": {
            "code": "F01",
            "diseaseCategory": {
              "code": "F01-F09",
              "name": "Mental disorders due to known physiological conditions"
            },
            "diseaseName": "Vascular dementia"
          },
          "shortDescription": "Vascular dementia, unsp severity, without beh/psych/mood/anx",
          "longDescription": "Vascular dementia, unspecified severity, without behavioral disturbance, psychotic disturbance, mood disturbance, and anxiety",
          "patient_count": 1
        }
      ],
      "medicine": [
        {
          "id": 13,
          "name": "abc",
          "dosage": "10 ml",
          "timing": "2 times"
        },
        {
          "id": 14,
          "name": "cde",
          "dosage": "20 ml",
          "timing": "3 times"
        }
      ],
      "patient_age": 0,
      "patient_fname": "Nik",
      "patient_lname": "s",
      "patient_village_name": "Kuganari",
      "prescription_id": 22,
      "treatment": null
    },
    {
      "aabhaId": null,
      "date": "24-April-2024",
      "disease_code": [
        {
          "code": "F10282",
          "diseaseSubCategory": {
            "code": "F10",
            "diseaseCategory": {
              "code": "F10-F19",
              "name": "Mental and behavioral disorders due to psychoactive substance use"
            },
            "diseaseName": "Alcohol related disorders"
          },
          "shortDescription": "Alcohol dependence with alcohol-induced sleep disorder",
          "longDescription": "Alcohol dependence with alcohol-induced sleep disorder",
          "patient_count": 1
        },
        {
          "code": "F0150",
          "diseaseSubCategory": {
            "code": "F01",
            "diseaseCategory": {
              "code": "F01-F09",
              "name": "Mental disorders due to known physiological conditions"
            },
            "diseaseName": "Vascular dementia"
          },
          "shortDescription": "Vascular dementia, unsp severity, without beh/psych/mood/anx",
          "longDescription": "Vascular dementia, unspecified severity, without behavioral disturbance, psychotic disturbance, mood disturbance, and anxiety",
          "patient_count": 1
        }
      ],
      "medicine": [
        {
          "id": 15,
          "name": "abc",
          "dosage": "10 ml",
          "timing": "2 times"
        },
        {
          "id": 16,
          "name": "cde",
          "dosage": "20 ml",
          "timing": "3 times"
        }
      ],
      "patient_age": 0,
      "patient_fname": "Nik",
      "patient_lname": "s",
      "patient_village_name": "Kuganari",
      "prescription_id": 23,
      "treatment": null
    },
    {
      "aabhaId": null,
      "date": "01-May-2024",
      "disease_code": [
        {
          "code": "F10282",
          "diseaseSubCategory": {
            "code": "F10",
            "diseaseCategory": {
              "code": "F10-F19",
              "name": "Mental and behavioral disorders due to psychoactive substance use"
            },
            "diseaseName": "Alcohol related disorders"
          },
          "shortDescription": "Alcohol dependence with alcohol-induced sleep disorder",
          "longDescription": "Alcohol dependence with alcohol-induced sleep disorder",
          "patient_count": 1
        },
        {
          "code": "F0150",
          "diseaseSubCategory": {
            "code": "F01",
            "diseaseCategory": {
              "code": "F01-F09",
              "name": "Mental disorders due to known physiological conditions"
            },
            "diseaseName": "Vascular dementia"
          },
          "shortDescription": "Vascular dementia, unsp severity, without beh/psych/mood/anx",
          "longDescription": "Vascular dementia, unspecified severity, without behavioral disturbance, psychotic disturbance, mood disturbance, and anxiety",
          "patient_count": 1
        }
      ],
      "medicine": [
        {
          "id": 17,
          "name": "abc",
          "dosage": "10 ml",
          "timing": "2 times"
        },
        {
          "id": 18,
          "name": "cde",
          "dosage": "20 ml",
          "timing": "3 times"
        }
      ],
      "patient_age": 0,
      "patient_fname": "Nik",
      "patient_lname": "s",
      "patient_village_name": "Kuganari",
      "prescription_id": 24,
      "treatment": null
    },
    {
      "aabhaId": null,
      "date": "21-April-2024",
      "disease_code": [
        {
          "code": "F10282",
          "diseaseSubCategory": {
            "code": "F10",
            "diseaseCategory": {
              "code": "F10-F19",
              "name": "Mental and behavioral disorders due to psychoactive substance use"
            },
            "diseaseName": "Alcohol related disorders"
          },
          "shortDescription": "Alcohol dependence with alcohol-induced sleep disorder",
          "longDescription": "Alcohol dependence with alcohol-induced sleep disorder",
          "patient_count": 1
        },
        {
          "code": "F0150",
          "diseaseSubCategory": {
            "code": "F01",
            "diseaseCategory": {
              "code": "F01-F09",
              "name": "Mental disorders due to known physiological conditions"
            },
            "diseaseName": "Vascular dementia"
          },
          "shortDescription": "Vascular dementia, unsp severity, without beh/psych/mood/anx",
          "longDescription": "Vascular dementia, unspecified severity, without behavioral disturbance, psychotic disturbance, mood disturbance, and anxiety",
          "patient_count": 1
        }
      ],
      "medicine": [
        {
          "id": 35,
          "name": "abc",
          "dosage": "10 ml",
          "timing": "2 times"
        },
        {
          "id": 36,
          "name": "cde",
          "dosage": "20 ml",
          "timing": "3 times"
        }
      ],
      "patient_age": 24,
      "patient_fname": "Sanket",
      "patient_lname": "Patil",
      "patient_village_name": "Kuganari",
      "prescription_id": 33,
      "treatment": null
    },
    {
      "aabhaId": null,
      "date": "28-April-2024",
      "disease_code": [
        {
          "code": "F3012",
          "diseaseSubCategory": {
            "code": "F30",
            "diseaseCategory": {
              "code": "F30-F39",
              "name": "Mood [affective] disorders"
            },
            "diseaseName": "Manic episode"
          },
          "shortDescription": "Manic episode without psychotic symptoms, moderate",
          "longDescription": "Manic episode without psychotic symptoms, moderate",
          "patient_count": 1
        },
        {
          "code": "F3013",
          "diseaseSubCategory": {
            "code": "F30",
            "diseaseCategory": {
              "code": "F30-F39",
              "name": "Mood [affective] disorders"
            },
            "diseaseName": "Manic episode"
          },
          "shortDescription": "Manic episode, severe, without psychotic symptoms",
          "longDescription": "Manic episode, severe, without psychotic symptoms",
          "patient_count": 1
        }
      ],
      "medicine": [
        {
          "id": 37,
          "name": "ASDF",
          "dosage": "ASF",
          "timing": "ASF"
        }
      ],
      "patient_age": 30,
      "patient_fname": "Shahrukh",
      "patient_lname": "Khan",
      "patient_village_name": "Kuganari",
      "prescription_id": 34,
      "treatment": null
    }
  ]

  const fetchDataFromDatabase = async () => {
    try {
      const prescRes = await SelectService.selectAllPrescriptions();

      console.log(
        "[PrescriptionScreeen]Prescriptions Fetched From Database: ",
        prescRes
      );
      setData(sample_data);
      
      setFilteredData(sample_data);
    } catch (error) {
      console.error("Error fetching data from database(HomeScreen):", error);
    }
  };

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  const handleShowPrescription = (aabhaId) => {
    
  }

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
              <View>
                <Text onPress={handleShowPrescription(item.aabhaId)} style={styles.textName}>
                  {item.patient_fname} {item.patient_lname}
                </Text>
                {/* <Text style={styles.textEmail}>{item.login.username}</Text> */}
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
