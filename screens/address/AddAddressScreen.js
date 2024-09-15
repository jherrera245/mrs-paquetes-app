import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import MainContent from "../../components/MainContent";
import Button from "../../components/Button";
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import { fetchData, postData } from '../../api/client';
import Errors from '../../components/Errors';
import Loader from '../../components/Loader';
import Toast from "react-native-toast-message";
import InputMask from "../../components/InputMask";
import TextArea from "../../components/TextArea";
import Dropdown from "../../components/Dropdown";
import Input from "../../components/Input";

const AddAddressScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const styles = getStyles(colorScheme);

    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState({});

    const user = useSelector(state => state.login.user);
    const token = user.token;

    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState("");
    const [referencia, setReferencia] = useState("");
    const [selectedDepartamento, setSelectedDepartamento] = useState(null);
    const [selectedMunicipio, setSelectedMunicipio] = useState(null);
    const [departamentos, setDepartamentos] = useState([]);
    const [municipios, setMunicipios] = useState([]);

    useEffect(() => {
        const getProfile = async () => {
            setLoading(true);
            try {
                const response = await fetchData("perfil-cliente", {}, { Authorization: `Bearer ${token}` });
                if (response) {
                    setProfile(response);
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: `Formato de respuesta inesperado.!!`
                    });
                }
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: `Hubo un problema al cargar el perfil.!!`
                });
            } finally {
                setLoading(false);
            }
        };
        getProfile();
    }, [token]);

    useEffect(() => {
        const getDepartamentos = async () => {
            setLoading(true);
            try {
                const response = await fetchData("dropdown/get_departamentos", {}, { Authorization: `Bearer ${token}` });
                if (response && Array.isArray(response)) {
                    const formattedDepartamentos = response.map(depto => ({
                        label: depto.nombre,
                        value: depto.id
                    }));
                    setDepartamentos(formattedDepartamentos);
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: `Formato de respuesta inesperado.!!`
                    });
                }
            } catch (error) {
                console.error("Error fetching departamentos:", error);
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: `Hubo un problema al cargar los departamentos.!!`
                });
            } finally {
                setLoading(false);
            }
        };
        getDepartamentos();
    }, [token]);

    useEffect(() => {
        const getMunicipios = async () => {
            if (selectedDepartamento) {
                setLoading(true);
                try {
                    const response = await fetchData(`dropdown/get_municipio/${selectedDepartamento}`, {}, { Authorization: `Bearer ${token}` });
                    if (response && Array.isArray(response.municipio)) {
                        const formattedMunicipios = response.municipio.map(municipio => ({
                            label: municipio.nombre,
                            value: municipio.id
                        }));
                        setMunicipios(formattedMunicipios);
                    } else {
                        Toast.show({
                            type: 'error',
                            text1: 'Error',
                            text2: `Formato de respuesta inesperado.!!`
                        });
                    }
                } catch (error) {
                    console.error("Error fetching municipios:", error);
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: `Hubo un problema al cargar los municipios.!!`
                    });
                } finally {
                    setLoading(false);
                }
            } else {
                setMunicipios([]);
            }
        };
        getMunicipios();
    }, [selectedDepartamento, token]);

    const handleCloseErrors = () => {
        setErrors(null);
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    const handleDepartamentoChange = (value) => {
        setSelectedDepartamento(value);
        setSelectedMunicipio(null);
    };

    const handleMunicipioChange = (value) => {
        setSelectedMunicipio(value);
    };

    const handleDireccion = async () => {
        setLoading(true);
        try {
            const data = {
                id_cliente: profile.cliente.id,
                nombre_contacto: nombre,
                telefono: telefono,
                id_departamento: selectedDepartamento,
                id_municipio: selectedMunicipio,
                direccion: direccion,
                referencia: referencia
            };

            const response = await postData(`direcciones`, data,
                { Authorization: `Bearer ${token}` }
            );

            if (response.direccion) {
                Toast.show({
                    type: 'success',
                    text1: 'Proceso completado',
                    text2: `Dirección registrada correctamente!!`
                });
                navigation.replace("Dashboard");
            } else if (response.error) {
                setErrors(response.error);
            }
        } catch (error) {
            setErrors(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <MainContent>
            <View style={styles.container}>
                {loading && <Loader />}
                {profile.hasOwnProperty('cliente') && (
                    <>
                        <View style={styles.header}>
                            <View style={styles.profileImage}>
                                <Icon name="home" size={100} color="#4267B2" />
                            </View>
                            <Text style={styles.name}>Registrar dirección</Text>
                            <Text style={styles.subname}>Ingresa tus datos</Text>
                        </View>
                        <Input
                            placeholder="Nombre"
                            onChangeText={(text) => setNombre(text)}
                            value={nombre}
                            keyboardType="text"
                            autoCapitalize="none"
                            style={styles.input}
                        />
                        <InputMask
                            value={telefono}
                            onChangeText={setTelefono}
                            placeholder="Teléfono"
                            mask="9999-9999"
                            style={styles.inputMask}
                        />
                        {departamentos.length > 0 && (
                            <Dropdown
                                items={departamentos}
                                placeholder="Selecciona un departamento"
                                searchPlaceholder="Buscar..."
                                onValueChange={handleDepartamentoChange}
                                defaultValue={selectedDepartamento}
                            />
                        )}
                        {municipios.length > 0 && (
                            <>
                                <Dropdown
                                    items={municipios}
                                    placeholder="Selecciona un municipio"
                                    searchPlaceholder="Buscar..."
                                    onValueChange={handleMunicipioChange}
                                    defaultValue={selectedMunicipio}
                                />
                                <TextArea
                                    value={direccion}
                                    onChangeText={(text) => setDireccion(text)}
                                    placeholder="Ingresa la dirección"
                                    style={styles.input}
                                />
                                <TextArea
                                    value={referencia}
                                    onChangeText={(text) => setReferencia(text)}
                                    placeholder="Punto de referencia"
                                    style={styles.input}
                                />
                            </>
                        )}
                        <Animatable.View animation="fadeInUp" duration={1500} delay={500} style={styles.buttonContainer}>
                            <Button
                                title="Registrar dirección"
                                onPress={handleDireccion}
                                typeButton="primary"
                            />
                            <Button
                                title="Cancelar"
                                onPress={handleCancel}
                                typeButton="danger"
                            />
                        </Animatable.View>
                    </>
                )}
                {errors && <Errors errors={errors} onClose={handleCloseErrors} />}
            </View>
        </MainContent>
    );
};

const getStyles = (colorScheme) => {
  const lightStyles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: '#fff',
          padding: 20,
          borderRadius: 15,
      },
      header: {
          alignItems: 'center',
          marginBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#E0E0E0',
          paddingBottom: 20,
      },
      profileImage: {
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: '#E0E0E0',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
      },
      name: {
          fontSize: 24,
          fontWeight: 'bold',
          color: '#333',
      },
      input: {
          width: '100%',
          backgroundColor: '#f4f4f4',
          padding: 15,
          borderRadius: 5,
          marginBottom: 10,
      },        
      inputMask: {
        width: '100%',
        backgroundColor: '#f4f4f4',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
      },
      buttonContainer: {
          marginTop: 20,
      },
  });

  const darkStyles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: '#4444',
          padding: 20,
          borderRadius: 15,
      },
      header: {
          alignItems: 'center',
          marginBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#555',
          paddingBottom: 20,
      },
      profileImage: {
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: '#555',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
      },
      name: {
          fontSize: 24,
          fontWeight: 'bold',
          color: '#fff',
      },
      subname: {        
        color: '#fff',
    },
      input: {
          width: '100%',
          backgroundColor: '#444',
          padding: 15,
          borderRadius: 5,
          marginBottom: 10,
      },
      inputMask: {
        width: '100%',
        backgroundColor: '#444',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
      },
      buttonContainer: {
          marginTop: 20,
      },
  });

  return colorScheme === 'dark' ? darkStyles : lightStyles;
};

export default AddAddressScreen;
