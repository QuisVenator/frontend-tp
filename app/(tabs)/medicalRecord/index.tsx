import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Text, View } from "../../../components/Themed";
import MedicalRecordTable from "../../../components/MedicalRecordTable";
import { Link } from "expo-router";
import React from "react";
import * as XLSX from 'xlsx';
import { useMedicalRecordContext } from "../../../provider/MedicalRecordContext";
import { MedicalRecord } from "../../../models/MedicalRecord";
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';

export default function TabTwoScreen() {
  const medicalRecordContext = useMedicalRecordContext();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ficha Clínica</Text>
      <View>
        <Link href="/medicalRecord/add" asChild>
          <Button icon="plus">Agregar</Button>
        </Link>
        <Button icon="download" onPress={() => excel(medicalRecordContext.state.medicalRecords)}>Exportar Excel</Button>
        <Button icon="download" onPress={() => print(medicalRecordContext.state.medicalRecords)}>Exportar PDF</Button>
        <MedicalRecordTable />
      </View>
    </View>
  );
}

async function print(records: MedicalRecord[]) {
  const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
  if (!permissions.granted) {
      return;
  }

  const html = `
  <html>
    <header></header>
    <title></title>
    <style>
        table, th, td {
           border:1px solid black;
        }
    </style>
    <body>
       <table style="width:8.35in">
        <thead>
          <tr>
            <th>ID</th>
            <th>Doctor</th>
            <th>Paciente</th>
            <th>Fecha</th>
            <th>Categoria</th>
            <th>Motivo</th>
            <th>Diágnostico</th>
          </tr>
        </thead>
        <tbody>
          ${records.map((record) => {
            return `
            <tr>
              <td>${record.id}</td>
              <td>${record.doctor.name} ${record.doctor.lastName}</td>
              <td>${record.patient.name} ${record.patient.lastName}</td>
              <td>${record.date.getFullYear()}/${record.date.getMonth().toString().padStart(2, '0')}/${record.date.getDate().toString().padStart(2, '0')}</td>
              <td>${record.category.description}</td>
              <td>${record.reason}</td>
              <td>${record.diagnostic}</td>
            </tr>`
          })}
        </tbody>
       </table>
    </body>
  </html>`
  const print = await Print.printToFileAsync({
     html: html,
     base64: true
  })

  try {
    await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, 'FichasMedicas.pdf', 'application/pdf')
        .then(async(uri) => {
          if(print.base64 !== undefined) {
            await FileSystem.writeAsStringAsync(uri, print.base64, { encoding: FileSystem.EncodingType.Base64 });
          } else {
            console.log("Error base64 did not work")
          }
        })
        .catch((e) => {
            console.log(e);
        });
  } catch (e) {
      console.log("Error")
  }
}

async function excel(records: MedicalRecord[]): Promise<void> {
  const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
  if (!permissions.granted) {
      return;
  }
  const records_translated = records.map((record) => {
    return {
      ID: record.id,
      Motivo: record.reason,
      Diagnostico: record.diagnostic,
      Fecha: record.date,
      Paciente: record.patient.name + " " + record.patient.lastName,
      Doctor: record.doctor.name + " " + record.doctor.lastName,
      Categoria: record.category.description,
    }
  });
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(records_translated);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
  const wbout = XLSX.write(wb, {
    type: 'base64',
    bookType: "xlsx"
  });

  try {
    await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, 'FichasMedicas.xlsx', 'application/xlsx')
        .then(async(uri) => {
            await FileSystem.writeAsStringAsync(uri, wbout, { encoding: FileSystem.EncodingType.Base64 });
        })
        .catch((e) => {
            console.log(e);
        });
  } catch (e) {
      console.log("Error")
  }



  // await Sharing.shareAsync(uri, {
  //   mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //   dialogTitle: 'MyWater data',
  //   UTI: 'com.microsoft.excel.xlsx'
  // });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "8%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
