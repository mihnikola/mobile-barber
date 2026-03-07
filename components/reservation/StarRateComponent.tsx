import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
// For Font Awesome icons, ensure you have @expo/vector-icons installed:
// npm install @expo/vector-icons
// or yarn add @expo/vector-icons
import { FontAwesome } from "@expo/vector-icons";
import { useLocalization } from "@/context/LocalizationContext";

// StarRating component props
interface StarRatingProps {
  maxStars?: number; // Maximum number of stars (default to 5)
  initialRating?: number; // Initial rating (default to 0)
  starSize?: number; // Size of the stars (default to 30)
  filledColor?: string; // Color for filled stars (default to #FFD700 - gold)
  emptyColor?: string; // Color for empty stars (default to #CCCCCC - light gray)
  onRatingChange?: (rating: number) => void; // Callback when rating changes
}

const StarRating: React.FC<StarRatingProps> = ({
  maxStars = 5,
  initialRating = 5,
  starSize = 23,
  filledColor = "#FFD700", // Gold color
  emptyColor = "#CCCCCC", // Light gray
  onRatingChange,
}) => {
  const {localization} = useLocalization();
  const [currentRating, setCurrentRating] = useState(initialRating);

  // Function to handle star press
  const handleStarPress = (rating: number) => {
    setCurrentRating(rating);
    if (onRatingChange) {
      onRatingChange(rating); // Call the callback with the new rating
    }
  };

  // Render individual stars
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
          activeOpacity={0.7} // Reduce opacity slightly when pressed
        >
          <FontAwesome
            name={i <= currentRating ? "star" : "star-o"} // 'star' for filled, 'star-o' for outlined
            size={starSize}
            color={i <= currentRating ? filledColor : emptyColor}
          />
        </TouchableOpacity>,
      );
    }
    return stars;
  };

  return (
    <View
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        gap:10,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "#FFFFFF",
        }}
      >
        {localization.APPOINTMENTS.rateReservation.rateUs}
      </Text>

      <View style={{  flexDirection: "row", marginBottom:5 }}>
        {renderStars()}
      </View>
    </View>
  );
};

export default StarRating;
