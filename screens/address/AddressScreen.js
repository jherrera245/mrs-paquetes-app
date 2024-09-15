import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import MainContent from "../../components/MainContent";
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { deleteData, fetchData } from '../../api/client';
import Errors from '../../components/Errors';
import { ListItem, Button } from "@rneui/base";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addressSuccess } from "../../redux/slice/addressSlice";
import Modal from 'react-native-modal';

const AddressScreen = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const styles = getStyles(colorScheme);

    const dispatch = useDispatch();
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState({});
    const [address, setAddress] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);  // Estado para controlar la visibilidad del modal
    const [selectedAddressId, setSelectedAddressId] = useState(null);  // Estado para guardar la dirección seleccionada para eliminar

    const user = useSelector(state => state.login.user);
    const token = user.token;

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
        const getDirecciones = async () => {
            setLoading(true);
            try {
                const response = await fetchData("direcciones", {
                    id_cliente: profile.cliente?.id
                }, { Authorization: `Bearer ${token}` });
                if (response) {
                    setAddress(response.direcciones);
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
                    text2: `Hubo un problema al cargar las direcciones.!!`
                });
            } finally {
                setLoading(false);
            }
        };
        if (profile.cliente) {
            getDirecciones();
        }
    }, [profile]);

    const handleEdit = (direccion) => {
        dispatch(
            addressSuccess({
              address: direccion,
            })
        );
        navigation.navigate('EditAddressScreen');
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await deleteData(`direcciones/${selectedAddressId}`, {
                Authorization: `Bearer ${token}`
            });
            if (response.message) {
                Toast.show({
                    type: 'success',
                    text1: 'Eliminado',
                    text2: `Dirección eliminada correctamente!!`
                });
                setAddress(prevAddresses => prevAddresses.filter(address => address.id !== selectedAddressId));
                setIsModalVisible(false);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: `Hubo un problema al eliminar la dirección.!!`
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: `Hubo un problema al eliminar la dirección.!!`
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseErrors = () => {
        setErrors(null);
    };

    const handleAddAddress = () => {
        navigation.navigate('AddAddressScreen');
    };

    const openDeleteModal = (addressId) => {
        setSelectedAddressId(addressId);
        setIsModalVisible(true);
    };

    return (
        <MainContent>
            <View style={styles.container}>
                {loading && <Loader />}

                {profile.hasOwnProperty('cliente') && (
                    <>
                        <View style={styles.header}>
                            <Text style={styles.name}>{profile.cliente.nombre} {profile.cliente.apellido}</Text>
                            <Text style={styles.subtitle}>Direcciones para entregas y recolectas</Text>

                            <Button
                                title="Añadir dirección"
                                icon={<Icon name="add" size={20} color="white" />}
                                buttonStyle={styles.addButton}
                                onPress={handleAddAddress}
                            />
                        </View>
                    </>
                )}

                {address.length > 0 ? (
                    <>
                        {address.map((direccion, index) => (
                            <ListItem.Swipeable
                                key={index}
                                bottomDivider
                                leftContent={(reset) => (
                                    <Button
                                        title="Eliminar"
                                        icon={<Icon name="delete" size={20} color="white" />}
                                        buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                                        onPress={() => openDeleteModal(direccion.id)}
                                    />
                                )}
                                rightContent={(reset) => (
                                    <Button
                                        title="Editar"
                                        icon={<Icon name="edit" size={20} color="white" />}
                                        buttonStyle={{ minHeight: '100%', backgroundColor: '#1565C0' }}
                                        onPress={() => handleEdit(direccion)}
                                    />
                                )}
                            >
                                <ListItem.Content>
                                    <ListItem.Title>{direccion.nombre_contacto}</ListItem.Title>
                                    <ListItem.Subtitle>{direccion.direccion}</ListItem.Subtitle>
                                    <ListItem.Subtitle>{direccion.telefono}</ListItem.Subtitle>
                                    <ListItem.Subtitle>{direccion.referencia}</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem.Swipeable>
                        ))}
                    </>
                ) : (
                    <Text style={styles.noAddressText}>Sin direcciones disponibles</Text>
                )}

                {errors && <Errors errors={errors} onClose={handleCloseErrors} />}

                <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Confirmación de Eliminación</Text>
                        <Text style={styles.modalMessage}>¿Estás seguro de que quieres eliminar esta dirección?</Text>
                        <View style={styles.modalButtons}>
                            <Button
                                title="Cancelar"
                                buttonStyle={styles.modalCancelButton}
                                onPress={() => setIsModalVisible(false)}
                            />
                            <Button
                                title="Eliminar"
                                buttonStyle={styles.modalDeleteButton}
                                onPress={handleDelete}
                            />
                        </View>
                    </View>
                </Modal>
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
      name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
      },
      subtitle: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
      },
      noAddressText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginTop: 20,
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      modalMessage: {
        fontSize: 16,
        marginBottom: 20,
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      modalButton: {
        padding: 10,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
      },
      modalCancelButton: {
        backgroundColor: '#ccc',
      },
      modalDeleteButton: {
        backgroundColor: 'red',
      },
      modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
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
      name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
      },
      subtitle: {
        fontSize: 16,
        color: '#ddd',
        marginBottom: 10,
      },
      noAddressText: {
        fontSize: 16,
        color: '#ddd',
        textAlign: 'center',
        marginTop: 20,
      },
      modalContent: {
        backgroundColor: '#444',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
      },
      modalMessage: {
        fontSize: 16,
        marginBottom: 20,
        color: '#ddd',
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      modalButton: {
        padding: 10,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
      },
      modalCancelButton: {
        backgroundColor: '#555',
      },
      modalDeleteButton: {
        backgroundColor: 'darkred',
      },
      modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
    });
  
    return colorScheme === 'dark' ? darkStyles : lightStyles;
  };

export default AddressScreen;
