import { View, Image, StyleSheet } from 'react-native'

const aboutapplication = () => {
  return (
    <View>
         <Image
           source={require("@/assets/images/settingsImage.jpg")}
           style={styles.headerImage}
           resizeMode="cover"
         />
         
       </View>
  )
}
const styles = StyleSheet.create({
  containerInfo: {
    marginTop: 20,
    flexDirection: "column",
    gap: 10,
  },
  headerImage: {
    width: "100%",
    height: 300,
    opacity: 0.3,
  },
});

export default aboutapplication