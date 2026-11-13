import {
  Animated,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
import { useRef, useState } from "react";
import { useLocalization } from "@/context/LocalizationContext";
import { AppText } from "@/components/ui";

const OnboardingComponent = ({ reviews }) => {
  const { localization } = useLocalization();

  const { width } = useWindowDimensions(); // Dohvatite širinu ekrana ovde
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.onboardingSection}>
      <AppText variant="displayLg" style={styles.reviewSectionTitle}>{localization.HOME.reviews}</AppText>
      {/* FlatList sada ima fiksnu širinu ekrana. */}
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <OnboardingItem item={item} itemWidth={width} />
        )} // Prosleđivanje širine kao prop
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item._id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
        scrollEventThrottle={32}
        style={{ width: width }}
      />
      <Paginator data={reviews} scrollX={scrollX} />
    </View>
  );
};

export default OnboardingComponent;

const styles = StyleSheet.create({
  onboardingSection: {
    marginBottom: 20,
  },
  reviewSectionTitle: {
    marginTop: 20,
    marginBottom: 15,
    paddingHorizontal: 20,
    textAlign: "center",
  },
});
