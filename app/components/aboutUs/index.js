import React, { useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
  Animated,
  Text,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AboutUsInfo from "../home/AboutUsInfo";
import ListAboutUs from "../home/ListAboutUs";
import ContactUs from "../home/ContactUs";
// DUMMY DATA za demonstraciju
import { REVIEW_DATA } from "@/constants";

// OnboardingItem sada prima širinu kao prop
const OnboardingItem = ({ item, itemWidth }) => {
  return (
    // Svaki element liste dobija eksplicitno širinu
    <View style={[styles.onboardingItemContainer, { width: itemWidth }]}>
      {/* Horizontalni padding je unutar svakog elementa. */}
      <View style={styles.reviewContentWrapper}>
        <Image
          source={require("@/assets/images/reviewImage.png")}
          style={styles.imageStyle}
        />

        <Text style={styles.reviewText}>{item.text}</Text>
        <Text style={styles.reviewTitle}>{item.title}</Text>
      </View>
    </View>
  );
};

const Paginator = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.paginatorContainer}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

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

const AboutUsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image
          source={require("../../../assets/images/logoBaber.png")}
          style={styles.backImage}
        />

        <View style={styles.contentContainer}>
          <AboutUsInfo />
          <ListAboutUs />
        </View>
        <OnboardingComponent />
        <View style={styles.contentContainer}>
          <ContactUs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  backImage: {
    width: "100%",
    resizeMode: "cover",
    opacity: 0.2,
    marginBottom: 20,
    position: "absolute",
  },
  imageStyle: {
    width: "100%",
    resizeMode: "cover",
    opacity: 0.5,
    position: "absolute",
  },

  imageBack: {
    width: "100%",
    resizeMode: "cover",
    opacity: 0.2,
    marginBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 0,
  },
  dummyText: {
    color: "gray",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
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
  onboardingItemContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  reviewContentWrapper: {
    paddingVertical: 30,
    paddingHorizontal:10
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
  reviewText: {
    fontStyle: "italic",
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginVertical: 40,
    marginHorizontal: 20
  },
  paginatorContainer: {
    flexDirection: "row",
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginHorizontal: 8,
  },
});

export default AboutUsScreen;
