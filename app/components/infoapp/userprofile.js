import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import ImageCompress from "../../../shared-components/ImageCompress";

const userprofile = () => {
  return (
    <ScrollView styles={styles.container}>
      <View>
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/settingsImage.jpg")}
            style={styles.headerImage}
            resizeMode="cover"
          />
          <View style={styles.imageContainerImage}>
            <ImageCompress />
          </View>
        </View>
      </View>
      <View style={styles.userData}>
        <View>
          <TextInput
            style={styles.textInput}
            defaultValue="mihaola993@gmail.com"
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
        <View>
          <TextInput style={styles.textInput} defaultValue="+3927564654564" />
        </View>
        <View>
          <TextInput defaultValue="+Predrag Kolica" style={styles.textInput} />
        </View>
        <TouchableOpacity>
          <Text style={styles.submitBtn}>Sacuvaj</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  submitBtn: {
    color: "white",
    backgroundColor: "gray",
    fontSize: 20,
    padding: 40,
  },
  container: {
    width: "100%",
  },
  userData: {
    margin: 20,
    display: "flex",
    gap: 20,
    marginVertical: 20,
  },
  imageContainerImage: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    marginBottom: 10,
    borderBottomWidth: 1,
    backgroundColor: "white",
    padding: 10,
  },
  imageContainer: {
    flex: 1,
  },
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

export default userprofile;
