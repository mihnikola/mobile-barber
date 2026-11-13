import React, { useState } from "react";
import { View, Text } from "react-native";
import { useLocalization } from "@/context/LocalizationContext";
import { colors, fonts } from "@/theme";
import { Icon, Pressable } from "@/components/ui";

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
  filledColor = colors.gold, // Gold color
  emptyColor = colors.textInactive, // Light gray
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
        <Pressable
          key={i}
          onPress={() => handleStarPress(i)}
          activeOpacity={0.7} // Reduce opacity slightly when pressed
        >
          <Icon
            name={i <= currentRating ? "starSolid" : "starOutline"} // filled / outlined
            size={starSize}
            rawColor={i <= currentRating ? filledColor : emptyColor}
          />
        </Pressable>,
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
          fontFamily: fonts.bold,
          color: colors.text,
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
