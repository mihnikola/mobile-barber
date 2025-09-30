import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { View } from "react-native"

const LoginRedirect = ({ onPress, title }) => {
    return (
        <View style={styles.profileSection}>
            <View style={styles.profileInfoIcon}>
                <Ionicons name='person-circle-sharp' size={30} color="grey" />
            </View>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.profileName}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}



const styles = StyleSheet.create({
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#333333",
    },
    profileInfoIcon: {
        paddingHorizontal: 15,
    },
    profileName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#FFFFFF",
    },

});
export default LoginRedirect;
