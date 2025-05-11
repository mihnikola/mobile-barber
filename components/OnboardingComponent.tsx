import { REVIEW_DATA } from "@/constants";
import React, { useRef, useState } from "react";
import { FlatList, StyleSheet, View, Animated } from "react-native";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";

const OnboardingComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;

  const slidesRef = useRef(null);

  // const viewableItemsChanged = useRef(({ viewableItems }) => {
  //   if (currentIndex > -1 && currentIndex < 5) {
  //     setCurrentIndex(viewableItems[0].index);
  //   }
  // }).current;



  const viewableItemsChanged = useRef(({ viewableItems }) => {
    // Check if there are any viewable items before accessing the first one
    if (viewableItems && viewableItems.length > 0) {
      const firstViewableItem = viewableItems[0];
      if (firstViewableItem.index !== undefined) {
        setCurrentIndex(firstViewableItem.index);
      }
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <View style={{flex: 3}}>
        <FlatList
          data={REVIEW_DATA}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          scrollEventThrottle={32}
        />
      </View>
      <Paginator data={REVIEW_DATA} scrollX={scrollX} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
});

export default OnboardingComponent;
