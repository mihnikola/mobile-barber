import { View, Image, StyleSheet } from 'react-native';

const Avatar = ({ url, size }) => {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      <Image
        style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
        source={{ uri: url }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
  },
});

export default Avatar;