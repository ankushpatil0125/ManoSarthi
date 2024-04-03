import React from "react";
import { View, StyleSheet } from "react-native";
import { DataTable, Card, Title } from "react-native-paper";
import { useLanguageContext } from "../Context/LanguageProvider";
import i18n from "../i18n";

const Table = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{i18n.t("Follow-up Schedule")}</Title>

          <DataTable>
            <DataTable.Header style={styles.head}>
              <DataTable.Title>{i18n.t("Name")}</DataTable.Title>
              <DataTable.Title>{i18n.t("Address")}</DataTable.Title>
              <DataTable.Title>{i18n.t("Status")}</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row style={styles.row}>
              <DataTable.Cell>Ankush</DataTable.Cell>
              <DataTable.Cell>Raver</DataTable.Cell>
              <DataTable.Cell>Pending</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row style={styles.row}>
              <DataTable.Cell>Nikhil</DataTable.Cell>
              <DataTable.Cell>UP</DataTable.Cell>
              <DataTable.Cell>Pending</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row style={styles.row}>
              <DataTable.Cell>Sanket</DataTable.Cell>
              <DataTable.Cell>Nashik</DataTable.Cell>
              <DataTable.Cell>Pending</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Card.Content>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 10, paddingHorizontal: 30 },
  card: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  head: { height: 44, backgroundColor: "lightblue" },
  row: { height: 50 },
});
export default Table;
