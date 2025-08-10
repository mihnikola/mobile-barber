import { REVIEW_DATA } from "@/constants";
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
import { useRef, useState } from "react";

const OnboardingComponent = () => {
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
      <Text style={styles.reviewSectionTitle}>Review</Text>
      {/* FlatList sada ima fiksnu širinu ekrana. */}
      <FlatList
        data={REVIEW_DATA}
        renderItem={({ item }) => (
          <OnboardingItem item={item} itemWidth={width} />
        )} // Prosleđivanje širine kao prop
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
        scrollEventThrottle={32}
        // Explicitna širina FlatList-e
        style={{ width: width }}
      />
      <Paginator data={REVIEW_DATA} scrollX={scrollX} />
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
    fontWeight: "800",
    fontSize: 29,
    color: "white",
    paddingHorizontal: 20,
    textAlign: "center",
  },
});
