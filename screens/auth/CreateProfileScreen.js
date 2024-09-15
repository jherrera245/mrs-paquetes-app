import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, postData } from "../../api/client";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import MainContent from "../../components/MainContent";
import Loader from "../../components/Loader";
import { Theme } from "../../theme/Theme";
import InputMask from "../../components/InputMask";
import { CheckBox } from "react-native-elements";
import TextArea from "../../components/TextArea";
import Errors from "../../components/Errors";
import Toast from "react-native-toast-message";

const CreateProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
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
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [tipoPersona, setTipoPersona] = useState([]);
  const [giros, setGiros] = useState([]);

  const now = new Date();

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
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

  const handleDepartamentoChange = (value) => {
    setSelectedDepartamento(value);
    setSelectedMunicipio(null);
    setDireccion("");
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

  const handleCrearPerfil = async () => {
    setLoading(true);
    try {
      const response = await postData("crear-perfil-cliente", {
        nombre: nombre,
        apellido: apellido,
        nombre_comercial: nombreComercial,
        dui: dui,
        telefono: telefono,
        id_tipo_persona: selectedTipoPersona,
        es_contribuyente: isContribuyenteChecked,
        fecha_registro: formatDate(now),
        id_estado: 1,
        id_departamento: selectedDepartamento,
        id_municipio: selectedMunicipio,
        nit: nit,
        nrc: nrc,
        giro: selectedGiro,
        nombre_empresa: nombreEmpresa,
        direccion: direccion
      },
        { Authorization: `Bearer ${token}` }
      );

      if (response.message) {
        Toast.show({
          type: 'success',
          text1: 'Proceso completado',
          text2: `El perfil ha sido creado correctamente!!`
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

  const handleCloseErrors = () => {
    setErrors(null);
  };

  return (
    <MainContent>
      {loading && <Loader />}

      <View style={styles.container}>
        <Text style={styles.title}>¡Ingresa tus datos!</Text>

        <Input
          placeholder="Nombres"
          onChangeText={(text) => setNombre(text)}
          value={nombre}
          keyboardType="text"
          autoCapitalize="none"
        />

        <Input
          placeholder="Apellidos"
          onChangeText={(text) => setApellido(text)}
          value={apellido}
          keyboardType="text"
          autoCapitalize="none"
        />

        <InputMask
          value={telefono}
          onChangeText={setTelefono}
          placeholder="Teléfono"
          mask="9999-9999"
        />

        {tipoPersona.length > 0 && (
          <Dropdown
            items={tipoPersona}
            placeholder="Selecciona el tipo de persona"
            searchPlaceholder="Buscar..."
            onValueChange={handleTipoPersonaChange}
          />
        )}

        {selectedTipoPersona === 2 ? (
          <>
            <Input
              placeholder="Nombre Empresa"
              onChangeText={(text) => setNombreEmpresa(text)}
              value={nombreEmpresa}
              keyboardType="text"
              autoCapitalize="none"
            />

            <Input
              placeholder="Nombre Comercial"
              onChangeText={(text) => setNombreComercial(text)}
              value={nombreComercial}
              keyboardType="text"
              autoCapitalize="none"
            />

            {giros.length > 0 && (
              <Dropdown
                items={giros}
                placeholder="Selecciona un giro"
                searchPlaceholder="Buscar..."
                onValueChange={handleGirosChange}
              />
            )}

            <InputMask
              value={nrc}
              onChangeText={setNrc}
              placeholder="NRC"
              mask="999999-9"
            />

            <InputMask
              value={nit}
              onChangeText={setNit}
              placeholder="NIT"
              mask="9999-999999-999-9"
            />

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
            <InputMask
              value={dui}
              onChangeText={setDui}
              placeholder="DUI"
              mask="99999999-9"
            />
          </>
        )}

        {departamentos.length > 0 && (
          <Dropdown
            items={departamentos}
            placeholder="Selecciona un departamento"
            searchPlaceholder="Buscar..."
            onValueChange={handleDepartamentoChange}
          />
        )}

        {municipios.length > 0 && (
          <>
            <Dropdown
              items={municipios}
              placeholder="Selecciona un municipio"
              searchPlaceholder="Buscar..."
              onValueChange={handleMunicipioChange}
            />

            <TextArea
              value={direccion}
              onChangeText={(text) => setDireccion(text)}
              placeholder="Ingresa la direccion"
            />
          </>
        )}

        <Button
          title="Crear Perfil"
          onPress={handleCrearPerfil}
          typeButton="primary"
        />

        {errors && <Errors errors={errors} onClose={handleCloseErrors} />}
      </View>
    </MainContent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 10,
    marginTop: 50,
    marginBottom: 40,
    backgroundColor: Theme.light.surface,
    borderRadius: 15,
    $dark: {
      backgroundColor: Theme.dark.primary
    }
  },
  title: {
    color: Theme.light.text,
    marginBottom: 20,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    $dark: {
      color: Theme.dark.text
    }
  },
  checkbox: {
    width: '100%',
    marginBottom: 16,
    color: Theme.light.text,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});

export default CreateProfileScreen;
