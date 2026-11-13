import React, { useState } from "react";
import { View } from "react-native";
import { useLocalization } from "@/context/LocalizationContext";
import { useTheme } from "@/theme";
import { AppText, Icon, Pressable } from "@/components/ui";

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
  starSize = 32,
  filledColor, // default: colors.star
  emptyColor, // default: colors.inkMuted
  onRatingChange,
}) => {
  const { colors } = useTheme();
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
            rawColor={i <= currentRating ? (filledColor ?? colors.star) : (emptyColor ?? colors.inkFaint)}
          />
        </Pressable>,
      );
    }
    return stars;
  };

  return (
    <View style={{ width: "100%", gap: 8 }}>
      <AppText variant="bodyStrong">{localization.APPOINTMENTS.rateReservation.rateUs}</AppText>
      <View style={{ flexDirection: "row", gap: 4 }}>{renderStars()}</View>
    </View>
  );
};

export default StarRating;
