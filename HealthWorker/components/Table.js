import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
const Table = () => {
    return (
        <View style={styles.container}>
            <DataTable>
                <DataTable.Header style={styles.head}>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Email</DataTable.Title>
                    <DataTable.Title numeric>Age</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row style={styles.row}>
                    <DataTable.Cell>Nabendu</DataTable.Cell>
                    <DataTable.Cell>nabendu@gmail.com</DataTable.Cell>
                    <DataTable.Cell numeric>33</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={styles.row}>
                    <DataTable.Cell>Shikha</DataTable.Cell>
                    <DataTable.Cell>shikha@gmail.com</DataTable.Cell>
                    <DataTable.Cell numeric>105</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={styles.row}>
                    <DataTable.Cell>Hriday</DataTable.Cell>
                    <DataTable.Cell>hriday@gmail.com</DataTable.Cell>
                    <DataTable.Cell numeric>23</DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        </View>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 10, paddingHorizontal: 30},
    head: { height: 44, backgroundColor: 'lightblue' },
    row: { height: 40},
})
export default Table