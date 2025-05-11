import { IconSymbol } from '@/components/ui/IconSymbol';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// CustomCheckbox component
interface CustomCheckboxProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, value, onChange }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onChange(!value)}>
     
      <Text style={styles.label}>{label}</Text>
     
      <View style={[styles.checkbox, value && styles.checked]}>
        {value && <IconSymbol color="white" name='check.cirle' size={20} />}
      </View>
    </TouchableOpacity>
  );
};
export default CustomCheckbox;
// Styles
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      justifyContent: 'space-between'
    },
    checkbox: {
      width: 24,
      height: 24,
      borderWidth: 2,
      borderRadius: 4,
      borderColor: '#555',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    checked: {
      backgroundColor: 'black', // Green color when checked
      borderColor: 'white',
    },
    checkmark: {
      width: 12,
      height: 12,
      borderRadius: 2,
      backgroundColor: "#4CAF50", /* Green checkmark color */
    },
    label: {
      fontSize: 16,
      color: '#333',
    },
  });