// import React, { useState, useEffect, useContext } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   TouchableOpacity,
// } from "react-native";
// import NetInfo from "@react-native-community/netinfo";
// import InsertService from "../Services/DatabaseServices/InsertService";
// import SelectService from "../Services/DatabaseServices/SelectService";
// import { BASE_URL, getToken } from "../utils/Constants";
// import axios from "axios";
// // import PatientContext from "../context/PatientContext"; // Import PatientContext here

// const EditDetailsScreen = ({ navigation }) => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   // const [email, setEmail] = useState("");
//   const [gender, setGender] = useState("");
//   // const [age, setAge] = useState("");
//   // const [address, setAddress] = useState("");
//   const [formError, setFormError] = useState("");
//   // const [showDatePicker, setShowDatePicker] = useState(false);
//   const [isConnected, setIsConnected] = useState(false);
//   // const [patients, setPatients] = useState([]);
//   // const { aabhaId } = useContext(PatientContext);
//   // const [emailError, setEmailError] = useState("");

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener((state) => {
//       setIsConnected(state.isConnected);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const fetchDataFromDatabase = async () => {
//     try {
//       const data = await SelectService.getWorkerDetail();
//       // const aabhaIdInfoData = await SelectService.getAllAabhaIdInfo();
//       // console.log("AabhaId Fetched From Data: ", aabhaIdInfoData);
//       // setPatients(data);
//       console.log(" SelectService.getWorkerDetail(); ", data);
//     } catch (error) {
//       console.error(
//         "Error fetching data from database  SelectService.getWorkerDetail();:",
//         error
//       );
//     }
//   };

//   // useEffect(() => {
//   //   fetchDataFromDatabase();
//   // }, []);

//   const handleSubmit = async () => {
//     if (!firstName.trim() || !lastName.trim() || !gender.trim()) {
//       setFormError("Please fill in all fields");
//       return;
//     }

//     // Email validation regular expression
//     // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//     // if (!emailRegex.test(email)) {
//     //   setFormError("Please enter a valid email address");
//     //   return;
//     // }

//     if (isConnected) {
//       console.log(firstName + " " + lastName + " " + gender);
//       await sendToServer();
//       navigation.goback();
//     }
//     // else {
//     //   await storeDataLocally();
//     // }
//   };
//   const sendToServer = async () =>{
//     try {
//       const workerDetails = {
//         firstName,
//         lastName,
//         gender,
//       };

//       const result = await axios.put(BASE_URL+"worker/updateworker",workerDetails,{
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${await getToken()}`,
//         },
//       });
//       console.log("result", result);
//       if(result){
//         Alert.alert("Updated Successfully");
//       }
//     } catch (error) {
//       console.error("Error storing data:", error);
//     }
//   }
//    const storeDataLocally = async () => {
//     try {
//       const workerDetails = {
//         firstName,
//         lastName,
//         gender,
//       };

//       const result = await InsertService.updateWorkerDetails(workerDetails);
//       console.log("result", result);
//     } catch (error) {
//       console.error("Error storing data locally:", error);
//     }
//   };

//   const handleFirstNameChange = (text) => {
//     // Filter out space characters from the input
//     const filteredText = text.replace(/\s/g, "");
//     setFirstName(filteredText);
//   };

//   const handleLastNameChange = (text) => {
//     // Filter out space characters from the input
//     const filteredText = text.replace(/\s/g, "");
//     setLastName(filteredText);
//   };

//   // Function to validate email format
//   // const validateEmail = (email) => {
//   //   const atIndex = email.indexOf('@');
//   //   const dotIndex = email.lastIndexOf('.');

//   //   if (atIndex === -1) {
//   //     setEmailError("Email must contain '@'");
//   //     return false;
//   //   }

//   //   if (dotIndex === -1 || dotIndex < atIndex) {
//   //     setEmailError("Invalid email format");
//   //     return false;
//   //   }

//   //   setEmailError(""); // Clear error if email format is correct
//   //   return true;
//   // };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "height" : "position"}
//       style={{ flex: 1 }}
//     >
//       <ScrollView
//         contentContainerStyle={styles.container}
//         keyboardShouldPersistTaps="handled" // Ensure taps outside TextInput dismiss keyboard
//         showsVerticalScrollIndicator={false}
//       >
//         <Text style={styles.label}>
//           First Name:<Text style={{ color: "red" }}>*</Text>
//         </Text>
//         <TextInput
//           style={styles.input}
//           value={firstName}
//           onChangeText={handleFirstNameChange}
//           placeholder="Enter first name"
//         />

//         <Text style={styles.label}>
//           Last Name:<Text style={{ color: "red" }}>*</Text>
//         </Text>
//         <TextInput
//           style={styles.input}
//           value={lastName}
//           onChangeText={handleLastNameChange}
//           placeholder="Enter last name"
//         />

//         <Text style={styles.label}>
//           Email:<Text style={{ color: "red" }}>*</Text>
//         </Text>

//         {/* {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null} */}
//         {/* {formError ? <Text style={styles.errorText}>{formError}</Text> : null} */}

//         <Text style={styles.label}>
//           Gender:<Text style={{ color: "red" }}>*</Text>
//         </Text>
//         <View style={styles.genderContainer}>
//           <TouchableOpacity
//             style={[
//               styles.genderOption,
//               gender === "male" && styles.selectedGender,
//             ]}
//             onPress={() => setGender("male")}
//           >
//             <Text style={styles.genderText}>Male</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.genderOption,
//               gender === "female" && styles.selectedGender,
//             ]}
//             onPress={() => setGender("female")}
//           >
//             <Text style={styles.genderText}>Female</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.genderOption,
//               gender === "other" && styles.selectedGender,
//             ]}
//             onPress={() => setGender("other")}
//           >
//             <Text style={styles.genderText}>Other</Text>
//           </TouchableOpacity>
//         </View>

//         {/* <Text style={styles.label}>Age:<Text style={{ color: 'red' }}>*</Text></Text>
//         <TextInput
//           style={styles.input}
//           onChangeText={(value) => {
//             // Check if the entered value contains only numeric characters
//             if (/^\d*$/.test(value)) {
//               if(value === '' || parseInt(value)<=110)
//               // If it contains only numeric characters, update the state
//               setAge(value);
//             }
//           }}
//           value={age}
//           placeholder="AGE"
//           placeholderTextColor="#666"
//           autoFocus // Automatically focus on input when the screen mounts
//           keyboardType="numeric"
//         /> */}

//         {/* <Text style={styles.label}>Address:<Text style={{ color: 'red' }}>*</Text></Text>
//         <TextInput
//           style={[styles.input]}
//           value={address}
//           onChangeText={setAddress}
//           multiline
//           numberOfLines={2}
//           placeholder="Enter address"
//         /> */}

//         <Button
//           title="Submit"
//           onPress={handleSubmit}
//           disabled={!firstName || !lastName || !gender}
//         />
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     paddingHorizontal: 30,
//     paddingTop: 20,
//     paddingBottom: 30,
//     justifyContent: "center",
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     marginBottom: 20,
//     color: "#000",
//     width: "100%",
//     fontSize: 16,
//   },
//   genderContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   genderOption: {
//     borderWidth: 1,
//     borderRadius: 15,
//     borderColor: "#ccc",
//     paddingVertical: 8,
//     paddingHorizontal: 20,
//   },
//   selectedGender: {
//     backgroundColor: "#3498db",
//   },
//   genderText: {
//     fontSize: 16,
//   },
//   errorText: {
//     color: "red",
//     marginBottom: 15,
//     fontSize: 16,
//   },
// });

// export default EditDetailsScreen;

import { StyleSheet, Text, View } from "react-native";
import React from "react";

const EditDetailsScreen = () => {
  return (
    <View>
      <Text>EditDetailsScreen</Text>
    </View>
  );
};

export default EditDetailsScreen;

const styles = StyleSheet.create({});
