import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Button, TouchableOpacity, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DropdownModal = ({ items, placeholder, searchPlaceholder, onValueChange, defaultValue }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue || null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (defaultValue !== value) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleValueChange = (newValue) => {
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
    setModalVisible(false)
  };

  const selectedText = items.find(item => item.value === value)?.label || placeholder;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.openButton}>
        <Text style={styles.openButtonText}>{selectedText}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={handleValueChange}
            setItems={() => { }}
            searchable={true}
            placeholder={placeholder}
            searchPlaceholder={searchPlaceholder}
            style={styles.dropdown}
            textStyle={styles.text}
            placeholderStyle={styles.placeholder}
            dropDownContainerStyle={styles.dropdownContainer}
            searchTextInputStyle={styles.searchInput}
            dropDownStyle={styles.dropDownStyle}
            itemStyle={styles.item}
            arrowIconStyle={styles.arrowIcon}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  openButton: {
    height: 56,
    width: '100%',
    color: '#000000',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    $dark: {
      backgroundColor: '#1E1E1E',
      color: '#EAEAEA',
      borderColor: '#333333',
      borderWidth: 1,
      elevation: 2,
      shadowColor: '#000000',
      shadowOpacity: 0.5,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 4 },
    }
  },
  openButtonText: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
    $dark: {
      color: '#EAEAEA',
    }
  },
  modalView: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  dropdown: {
    width: '100%',
    height: 56,
    backgroundColor: '#ffffff',
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
    $dark: {
      backgroundColor: '#1E1E1E',
      color: '#EAEAEA',
      borderColor: '#333333',
      borderWidth: 1, 
      elevation: 2,
      shadowColor: '#000000',
      shadowOpacity: 0.5,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 4 },
    }
  },
  text: {
    fontSize: 16,
    color: '#495057',
  },
  placeholder: {
    fontSize: 16,
    color: '#6c757d',
    $dark: {
      color: '#FFFFFF',
    }
  },
  dropdownContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
    maxHeight: 250,
    minHeight: 200,
    $dark: {
      backgroundColor: '#1E1E1E',
      color: '#EAEAEA',
      borderColor: '#333333',
      borderWidth: 1,
      elevation: 2,
      shadowColor: '#000000',
      shadowOpacity: 0.5,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 4 },
    }
  },
  searchInput: {
    color: '#495057',
  },
  dropDownStyle: {
    backgroundColor: '#ffffff',
  },
  item: {
    justifyContent: 'center',
    height: 40,
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
});

export default DropdownModal;
