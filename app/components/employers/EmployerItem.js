import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import placeholderImg from "../../../assets/images/placeholderImg.png";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { FontAwesome } from "@expo/vector-icons";

const EmployerItem = ({ data, redirectHandler }) => {
  const { id, image, name } = data;

  return (
    // <TouchableOpacity
    //   key={id}
    //   onPress={() => redirectHandler(data)}
    //   style={styles.wrapper}
    // >
    //   <View style={styles.content}>
    //     {image && <Image source={{ uri: image }} style={styles.image} />}
    //     {!image && <Image source={placeholderImg} style={styles.image} />}
    //     <View style={styles.data}>
    //       <Text style={styles.name}>{name}</Text>
    //     </View>
    //     <View style={{ display: "flex", justifyContent: "center" }}>
    //       <IconSymbol size={28} name="arrow.right" color="#000" />
    //     </View>
    //   </View>
    // </TouchableOpacity>
     <TouchableOpacity key={id} style={styles.card} onPress={() => redirectHandler(data)}>
       {image && <Image source={{ uri: image }} style={styles.profileImage} />}
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.locationContainer}>
          <FontAwesome name="trophy" size={16} color="#CCCCCC" />
          <Text style={styles.locationText}>Top Barber</Text>
        </View>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={16} color="#FFD700" /> {/* Gold star color */}
           <Text style={styles.ratingText}>10</Text>
          <Text style={styles.reviewText}>(25 Review)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
   card: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E', // Dark background from your image
    borderRadius: 12,
    padding: 15,
    marginVertical: 8, // Spacing between cards
    marginHorizontal: 15, // Side padding for the list
    alignItems: 'center',
    shadowColor: '#000', // For a subtle shadow (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30, // Makes it circular
    marginRight: 15,
    borderWidth: 1, // Optional: for a subtle border around the image
    borderColor: '#333',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text color
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#CCCCCC', // Lighter grey for location
    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700', // Gold color for rating number
    marginLeft: 5,
  },
  reviewText: {
    fontSize: 14,
    color: '#CCCCCC', // Lighter grey for review count
    marginLeft: 5,
  },
});

export default EmployerItem;
