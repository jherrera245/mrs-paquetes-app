import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import MainContent from "../../components/MainContent";
import Button from "../../components/Button";
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialIcons';
import formatDate from "../../utils/utils";
import * as Animatable from 'react-native-animatable';
import { fetchData, putData } from '../../api/client';
import { useDispatch } from 'react-redux';
import Errors from '../../components/Errors';
import Loader from '../../components/Loader';
import { CommonActions } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { CheckBox } from "react-native-elements";
import InputMask from "../../components/InputMask";
import TextArea from "../../components/TextArea";
import Dropdown from "../../components/Dropdown";
import Input from "../../components/Input";

const ProfileScreen = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const styles = colorScheme === 'dark' ? darkStyles : lightStyles;

    const dispatch = useDispatch();
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [profile, setProfile] = useState({});

    const user = useSelector(state => state.login.user);
    const token = user.token;

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [nombreComercial, setNombreComercial] = useState("");
    const [nombreEmpresa, setNombreEmpresa] = useState("");
    const [dui, setDui] = useState('');
    const [telefono, setTelefono] = useState('');
    const [nit, setNit] = useState('');
    const [nrc, setNrc] = useState('');
    const [isContribuyenteChecked, setIsContribuyenteChecked] = useState(false);
    const [direccion, setDireccion] = useState("");
    const [selectedDepartamento, setSelectedDepartamento] = useState(null);
    const [selectedMunicipio, setSelectedMunicipio] = useState(null);
    const [selectedTipoPersona, setSelectedTipoPersona] = useState(null);
    const [selectedGiro, setSelectedGiro] = useState(null);
    const [departamentos, setDepartamentos] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [tipoPersona, setTipoPersona] = useState([]);
    const [giros, setGiros] = useState([]);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isChangePassword, setChangePässword] = useState(false);

    const isPasswordSecure = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    };

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

    useEffect(() => {
        const getTipoPersona = async () => {
            setLoading(true);
            try {
                const response = await fetchData("dropdown/get_tipo_persona", {}, { Authorization: `Bearer ${token}` });
                if (response && Array.isArray(response.tipo_persona)) {
                    const formattedDepartamentos = response.tipo_persona.map(depto => ({
                        label: depto.nombre,
                        value: depto.id
                    }));
                    setTipoPersona(formattedDepartamentos);
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
                    text2: `Hubo un problema al cargar los tipos de personas.!!`
                });
            } finally {
                setLoading(false);
            }
        };
        getTipoPersona();
    }, [token]);

    useEffect(() => {
        const getGiros = async () => {
            setLoading(true);
            try {
                const response = await fetchData("dropdown/giros", {}, { Authorization: `Bearer ${token}` });
                if (response && Array.isArray(response.actividadEconomica)) {
                    const formattedGiros = response.actividadEconomica.map(actividad => ({
                        label: actividad.st_descripcion,
                        value: `${actividad.st_codigo}-${actividad.st_descripcion}`
                    }));
                    setGiros(formattedGiros);
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: `Formato de respuesta inesperado.!!`
                    });
                }
            } catch (error) {
                console.error("Error fetching giros:", error);
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: `Hubo un problema al cargar los giros.!!`
                });
            } finally {
                setLoading(false);
            }
        };
        getGiros();
    }, [token]);

    const handleLogout = async () => {
        setLoading(true);
        try {
            const response = await fetchData('auth/logout',
                { 'token': user.token },
                {
                    'Authorization': `Bearer ${user.token}`
                }
            );

            if (response.hasOwnProperty('success')) {
                Toast.show({
                    type: 'success',
                    text1: 'Proceso completado',
                    text2: `Has cerrado sesión exitosamente!`
                });

                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    })
                );
            }

            if (response.hasOwnProperty('error')) {
                setErrors(response.error);
            }

        } catch (error) {
            setErrors(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getProfile = async () => {
            setLoading(true);
            try {
                const response = await fetchData("perfil-cliente", {}, { Authorization: `Bearer ${token}` });
                if (response) {
                    setProfile(response);

                    const { cliente } = response;
                    setNombre(cliente.nombre || "");
                    setApellido(cliente.apellido || "");
                    setNombreComercial(cliente.nombre_comercial || "");
                    setNombreEmpresa(cliente.nombre_empresa || "");
                    setDui(cliente.dui || '');
                    setTelefono(cliente.telefono || '');
                    setNit(cliente.nit || '');
                    setNrc(cliente.nrc || '');
                    setIsContribuyenteChecked(cliente.es_contribuyente || false);
                    setDireccion(cliente.direccion || "");
                    setSelectedDepartamento(cliente.id_departamento || null);
                    setSelectedMunicipio(cliente.id_municipio || null);
                    setSelectedTipoPersona(cliente.id_tipo_persona || null);
                    setSelectedGiro(cliente.giro || null);
                    setEmail(user.user.email);
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: `Formato de respuesta inesperado.!!`
                    });
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
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

    const handleCloseErrors = () => {
        setErrors(null);
    };

    const toggleEdit = () => {
        setEditing(!editing);
        setChangePässword(false);
    };

    const handleDepartamentoChange = (value) => {
        setSelectedDepartamento(value);
        setSelectedMunicipio(null);
    };

    const handleMunicipioChange = (value) => {
        setSelectedMunicipio(value);
    };

    const handleTipoPersonaChange = (value) => {
        setSelectedTipoPersona(value);
    }

    const handleGirosChange = (value) => {
        setSelectedGiro(value);
    }

    const handleChangePassword = () => {
        setChangePässword(!isChangePassword);

        if (isChangePassword === false) {
            setPassword(null);
            setConfirmPassword(null);
        }
    }

    const handleActualizarPerfil = async () => {

        if (isChangePassword) {
            if (!isPasswordSecure(password)) {
                setErrors("La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula, un número y un carácter especial.");
                return;
            }

            if (password !== confirmPassword) {
                setErrors("Las contraseñas no coinciden.");
                return;
            }
        }

        setLoading(true);
        try {

            const data = {
                email: email,
                nombre: nombre,
                apellido: apellido,
                nombre_comercial: nombreComercial,
                dui: dui,
                telefono: telefono,
                id_tipo_persona: selectedTipoPersona,
                es_contribuyente: isContribuyenteChecked,
                id_estado: 1,
                id_departamento: selectedDepartamento,
                id_municipio: selectedMunicipio,
                nit: nit,
                nrc: nrc,
                giro: selectedGiro,
                nombre_empresa: nombreEmpresa,
                direccion: direccion
            };

            if (isChangePassword) {
                data.password = password;
            }

            const response = await putData(`actualizar-perfil-cliente`, data,
                { Authorization: `Bearer ${token}` }
            );

            if (response.message) {
                Toast.show({
                    type: 'success',
                    text1: 'Proceso completado',
                    text2: `El perfil ha sido actualizado correctamente!!`
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

    const renderInfoItem = (icon, label, value) => (
        <View style={styles.infoItem}>
            <View style={styles.iconContainer}>
                <Icon name={icon} size={24} color="#4267B2" />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
        </View>
    );

    return (
        <MainContent>
          <View style={styles.container}>
            {loading && <Loader />}
    
            {
              editing === false ? (
                profile.hasOwnProperty('cliente') && (
                  <>
                    <View style={styles.header}>
                      <View style={styles.profileImage}>
                        <Icon name="people" size={100} color="#4267B2" />
                      </View>
                      <Text style={styles.name}>{profile.cliente.nombre} {profile.cliente.apellido}</Text>
                      <Text style={styles.email}>{user.user.email}</Text>
                    </View>
                    <View style={styles.profileInfo}>
                      {renderInfoItem("event", "Fecha de creación", formatDate(user.user.created_at))}
                      {renderInfoItem("event", "Última modificación", formatDate(user.user.updated_at))}
                      {renderInfoItem("phone", "Teléfono", profile.cliente.telefono)}
                      {renderInfoItem("badge", "DUI", profile.cliente.dui)}
                      {renderInfoItem("business", "Nombre Comercial", profile.cliente.nombre_comercial ? profile.cliente.nombre_comercial : 'No disponible')}
                      {renderInfoItem("business", "Nombre de Empresa", profile.cliente.nombre_empresa ? profile.cliente.nombre_empresa : 'No disponible')}
                      {renderInfoItem("home", "Dirección", profile.cliente.direccion)}
                      {renderInfoItem("star", "Giro", profile.cliente.giro ? profile.cliente.giro : 'No disponible')}
                      {renderInfoItem("business", "NIT", profile.cliente.nit ? profile.cliente.nit : 'No disponible')}
                      {renderInfoItem("business", "NRC", profile.cliente.nrc ? profile.cliente.nrc : 'No disponible')}
                      {renderInfoItem("star", "Es Contribuyente", profile.cliente.es_contribuyente ? 'Sí' : 'No')}
                    </View>
                    <Animatable.View animation="fadeInUp" duration={1500} delay={500} style={styles.buttonContainer}>
                      <Button title="Editar perfil" onPress={toggleEdit} typeButton="primary" />
                    </Animatable.View>
                    <Animatable.View animation="fadeInUp" duration={1500} delay={500} style={styles.buttonContainer}>
                      <Button title="Cerrar Sesión" onPress={() => handleLogout()} typeButton="danger" />
                    </Animatable.View>
                  </>
                )
              ) : (
                <>
                  <View style={styles.header}>
                    <View style={styles.profileImage}>
                      <Icon name="people" size={100} color="#4267B2" />
                    </View>
                    <Text style={styles.name}>¡Actualizar perfil!</Text>
                  </View>
                  <Input placeholder="Nombres" onChangeText={(text) => setNombre(text)} value={nombre} keyboardType="text" autoCapitalize="none" />
                  <Input placeholder="Apellidos" onChangeText={(text) => setApellido(text)} value={apellido} keyboardType="text" autoCapitalize="none" />
                  <Input placeholder="Email" onChangeText={(text) => setEmail(text)} value={email} keyboardType="email-address" autoCapitalize="none" />
                  <InputMask value={telefono} onChangeText={setTelefono} placeholder="Teléfono" mask="9999-9999" />
                  {tipoPersona.length > 0 && (
                    <Dropdown
                      items={tipoPersona}
                      placeholder="Selecciona el tipo de persona"
                      searchPlaceholder="Buscar..."
                      onValueChange={handleTipoPersonaChange}
                      defaultValue={selectedTipoPersona}
                    />
                  )}
                  {selectedTipoPersona === 2 ? (
                    <>
                      <Input placeholder="Nombre Empresa" onChangeText={(text) => setNombreEmpresa(text)} value={nombreEmpresa} keyboardType="text" autoCapitalize="none" />
                      <Input placeholder="Nombre Comercial" onChangeText={(text) => setNombreComercial(text)} value={nombreComercial} keyboardType="text" autoCapitalize="none" />
                      {giros.length > 0 && (
                        <Dropdown
                          items={giros}
                          placeholder="Selecciona un giro"
                          searchPlaceholder="Buscar..."
                          onValueChange={handleGirosChange}
                          defaultValue={selectedGiro}
                        />
                      )}
                      <InputMask value={nrc} onChangeText={setNrc} placeholder="NRC" mask="999999-9" />
                      <InputMask value={nit} onChangeText={setNit} placeholder="NIT" mask="9999-999999-999-9" />
                      <CheckBox
                        title="Soy Contribuyente"
                        checked={isContribuyenteChecked}
                        onPress={() => setIsContribuyenteChecked(!isContribuyenteChecked)}
                        containerStyle={styles.checkbox}
                        textStyle={styles.label}
                      />
                    </>
                  ) : (
                    <>
                      <InputMask value={dui} onChangeText={setDui} placeholder="DUI" mask="99999999-9" />
                    </>
                  )}
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
                      <TextArea value={direccion} onChangeText={(text) => setDireccion(text)} placeholder="Ingresa la direccion" />
                    </>
                  )}
                  <Button title={isChangePassword ? 'Cancelar' : 'Cambiar contraseña'} onPress={handleChangePassword} typeButton={isChangePassword ? 'danger' : 'success'} />
                  {isChangePassword && (
                    <>
                      <Input placeholder="Contraseña" onChangeText={(text) => setPassword(text)} value={password} secureTextEntry />
                      <Input placeholder="Confirmar Contraseña" onChangeText={(text) => setConfirmPassword(text)} value={confirmPassword} secureTextEntry />
                    </>
                  )}
                  <Animatable.View animation="fadeInUp" duration={1500} delay={500} style={styles.buttonContainer}>
                    <Button title="Actualizar" onPress={handleActualizarPerfil} typeButton="primary" />
                    <Button title="Cancelar" onPress={toggleEdit} typeButton="danger" />
                  </Animatable.View>
                </>
              )
            }
            {errors && <Errors errors={errors} onClose={handleCloseErrors} />}
          </View>
        </MainContent>
      );
    };

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
    empresa: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    email: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    profileInfo: {
        marginBottom: 20,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconContainer: {
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        color: '#666',
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        backgroundColor: '#f4f4f4',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
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
        borderBottomColor: '#444',
        paddingBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    empresa: {
        fontSize: 16,
        color: '#aaa',
        marginBottom: 10,
    },
    email: {
        fontSize: 16,
        color: '#aaa',
        marginBottom: 10,
    },
    profileInfo: {
        marginBottom: 20,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconContainer: {
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        color: '#888',
        fontWeight: 'bold',
    },
    value: {
        fontSize: 16,
        color: '#fff',
    },
    buttonContainer: {
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    modalContent: {
        backgroundColor: '#222',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        backgroundColor: '#333',
        color: '#fff',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
});


export default ProfileScreen;
