// import React, { useState, useEffect } from "react";
// import {
//   Modal,
//   Text,
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
// } from "react-native";
// import { DataTable, Card, Title } from "react-native-paper";

// const PrescriptionModal = ({ visible, closeModal, prescription }) => {
//   console.log("In Modal: ", JSON.parse(prescription.medicine));
//   const medicine_data = JSON.parse(prescription?.medicine);
//   console.log("In Modal Again: ", medicine_data);

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={closeModal}
//     >
//       <View style={styles.modalOverlay}>
//         <View
//           style={styles.modalContainer}
//         >
//           <View>
//             <Text>Date: {prescription.date}</Text>

//             <Text style={styles.subTitle}>Patient Information:</Text>

//             <Card style={styles.card}>
//               <Card.Content>
//                 {/* <Text>AabhaId: {prescription.aabhaId}</Text> */}
//                 <Text>Prescription ID: {prescription.prescription_id}</Text>
//                 <Text>
//                   Patient Name: {prescription.patient_fname}{" "}
//                   {prescription.patient_lname}
//                 </Text>

//                 {/* <Text>Disease Code: {prescription.disease_code}</Text> */}
//                 {/* <Text>Medicine: {prescription.medicine}</Text> */}
//                 <Text>Patient Age: {prescription.patient_age}</Text>

//                 <Text>Village: {prescription.patient_village_name}</Text>
//               </Card.Content>
//             </Card>
//           </View>
//           <Text style={styles.subTitle}>Medicines:</Text>
//           <View style={styles.container}>
//             <Card style={styles.card}>
//               <Card.Content>
//                 <DataTable>
//                   <DataTable.Header style={styles.head}>
//                     <DataTable.Title>Name</DataTable.Title>
//                     <DataTable.Title>Dosage</DataTable.Title>
//                     <DataTable.Title>Timing</DataTable.Title>
//                   </DataTable.Header>
//                   {medicine_data.map((item, id) => (
//                     <DataTable.Row key={id} style={styles.row}>
//                       <DataTable.Cell>{item.name}</DataTable.Cell>
//                       <DataTable.Cell>{item.dosage}</DataTable.Cell>
//                       <DataTable.Cell>{item.timing}</DataTable.Cell>
//                     </DataTable.Row>
//                   ))}
//                 </DataTable>
//               </Card.Content>
//             </Card>
//           </View>

//           <TouchableOpacity onPress={closeModal}>
//             <Text style={{ color: "blue", marginTop: 10 }}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   modalContent: {
//     backgroundColor: "white",
//     padding: 20,
//     borderRadius: 10,
//     width: "80%",
//     maxHeight: "80%",
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   subTitle: {
//     fontSize: 13,
//     fontWeight: "bold",
//     marginTop: 10,
//     marginBottom: 5,
//   },
//   medicineItem: {
//     marginBottom: 10,
//   },
//   closeButton: {
//     color: "blue",
//     marginTop: 10,
//     textAlign: "right",
//   },
//   container: { paddingTop: 10, paddingHorizontal: 10 },
//   card: {
//     elevation: 5,
//     borderRadius: 10,
//     backgroundColor: "#fff",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   title: {
//     marginBottom: 10,
//     textAlign: "center",
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   head: { height: 44, backgroundColor: "lightblue" },
//   row: { height: 50 },
// });

// export default PrescriptionModal;
import React, { useState, useEffect } from "react";
import { Modal, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { DataTable, Card, Title } from "react-native-paper";

const PrescriptionModal = ({ visible, closeModal, prescription }) => {
  const medicine_data = JSON.parse(prescription?.medicine);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View>
            <Text>Date: {prescription.date}</Text>

            <Text style={styles.subTitle}>Patient Information:</Text>

            <Card style={styles.card}>
              <Card.Content>
                <Text>Prescription ID: {prescription.prescription_id}</Text>
                <Text>
                  Patient Name: {prescription.patient_fname}{" "}
                  {prescription.patient_lname}
                </Text>
                <Text>Patient Age: {prescription.patient_age}</Text>
                <Text>Village: {prescription.patient_village_name}</Text>
              </Card.Content>
            </Card>
          </View>
          <Text style={styles.subTitle}>Medicines:</Text>
          <View style={styles.container}>
            <Card style={styles.card}>
              <Card.Content>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Dosage</DataTable.Title>
                    <DataTable.Title>Timing</DataTable.Title>
                  </DataTable.Header>
                  {medicine_data.map((item, id) => (
                    <DataTable.Row key={id}>
                      <DataTable.Cell>{item.name}</DataTable.Cell>
                      <DataTable.Cell>{item.dosage}</DataTable.Cell>
                      <DataTable.Cell>{item.timing}</DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </Card.Content>
            </Card>
          </View>

          <TouchableOpacity onPress={closeModal}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  subTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  closeButton: {
    color: "blue",
    marginTop: 10,
    textAlign: "right",
  },
  container: { paddingTop: 10, paddingHorizontal: 10 },
  card: {
    elevation: 5,
    borderRadius: 10,
    // backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default PrescriptionModal;
