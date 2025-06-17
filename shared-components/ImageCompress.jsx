import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import { IconSymbol } from "@/components/ui/IconSymbol";
import usePickImage from '../app/components/infoapp/hooks/usePickImage';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';


export default function ImageCompress({ imageValue, handlePickImage }) {
    const { selectedImageUri, pickImage, uploading } = usePickImage(imageValue);

    useEffect(() => {
        if (selectedImageUri) {
            handlePickImage(selectedImageUri);
        }
    }, [selectedImageUri])

    return (
        <View style={styles.container}>
            {!selectedImageUri && (
                <Image
                    source={require("@/assets/images/defaultImgAvatar.png")}
                    style={styles.defaultImgAvatar}
                    resizeMode="cover"
                />)}
            {selectedImageUri ?
                <View style={styles.defaultImgAvatar}>
                    <Image source={{ uri: selectedImageUri }} style={styles.image} />
                </View>
                : <ActivityIndicator />}
            <TouchableOpacity style={[!selectedImageUri ? styles.buttonPlaceholder : styles.button]} onPress={pickImage} disabled={uploading}>
                <IconSymbol size={50} name="image" color="white" />
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    defaultImgAvatar: {
        width: 200,
        height: 200,
        marginVertical: 30,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        resizeMode: 'cover', // Ensures image fits within the bounds without distortion
    },
    button: {
        position: "absolute",
        left: 180,
        top: 200
    },
    buttonPlaceholder: {
        position: "absolute",
        left: 170,
        top: 180
    }
});
