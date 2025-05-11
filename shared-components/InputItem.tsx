// InputItem.js
import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const InputItem = ({ type, setUserName, userName, placeholder }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={userName}
        onChangeText={(text) => setUserName(text)} // Use onChangeText in React Native
        placeholder={placeholder}
        placeholderTextColor="#888" // Optional for placeholder styling
        autoCapitalize="none" // Prevent auto-caps in React Native
        autoCompleteType="off" // Disable autocomplete
        keyboardType={type === 'number' ? 'numeric' : 'default'} // Handle numeric type
        required
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16, // Adjust this based on your layout
  },
  input: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#E0E0E0', // Equivalent to bg-gray-300 in Tailwind CSS
    borderWidth: 1,
    borderColor: '#BDBDBD', // Equivalent to border-gray-300
    borderRadius: 8,
  },
});

export default InputItem;
