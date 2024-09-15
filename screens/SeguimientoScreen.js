import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import MainContent from "../components/MainContent";

const MisPaquetesScreen = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState(null);
  const [historial, setHistorial] = useState([]);

  const handleSubmit = () => {
    handleTrack(trackingNumber);
  };

  const handleTrack = async (trackingNumber) => {
    // Lógica de búsqueda y obtención de datos de seguimiento (puedes implementarla según tus necesidades)
    // Aquí puedes llamar a tu API para obtener los datos de seguimiento del paquete
    // Por simplicidad, aquí simularemos datos de seguimiento
    const mockData = {
      trackingNumber,
      status: "En Camino",
      history: [
        { status: 'Recepción', date: '2024-06-01 08:00 AM' },
        { status: 'En Bodega', date: '2024-06-01 10:00 AM' },
        { status: 'En Camino', date: '2024-06-01 02:00 PM' },
        { status: 'Entregado', date: '2024-06-01 06:00 PM' },
      ],
    };
    setTrackingData(mockData);
  };

  const handleInputChange = (value) => {
    setTrackingNumber(value);
    if (!value.trim()) {
      setTrackingData(null);
      setHistorial([]);
    }
  };

  return (
    <MainContent>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el número de seguimiento"
        value={trackingNumber}
        onChangeText={handleInputChange}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {trackingData && (
        <ScrollView style={styles.trackingResult}>
          <Text style={styles.resultText}>Resultado del Seguimiento</Text>
          {/* Visualización de resultados de seguimiento */}
          {trackingData.history.map((event, index) => (
            <View key={index} style={styles.eventContainer}>
              <Text style={styles.eventStatus}>{event.status}</Text>
              <Text style={styles.eventDate}>{event.date}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Otros componentes para mostrar el historial, si es necesario */}
    </View>
    </MainContent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#635bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  trackingResult: {
    marginTop: 20,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#fff",
    padding: 10,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  eventContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  eventStatus: {
    fontSize: 16,
    fontWeight: "bold",
  },
  eventDate: {
    fontSize: 14,
    color: "#666",
  },
});

export default MisPaquetesScreen;
