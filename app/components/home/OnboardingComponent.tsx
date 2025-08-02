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
  useWindowDimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// DUMMY DATA za demonstraciju
const REVIEW_DATA = [
  { id: "1", title: "Review 1", text: "Odličan servis, preporučujem svima!", backgroundColor: '#4a148c' },
  { id: "2", title: "Review 2", text: "Brzo i profesionalno, sigurno se vraćam.", backgroundColor: '#880e4f' },
  { id: "3", title: "Review 3", text: "Najbolji barber shop u gradu, atmosfera je fenomenalna.", backgroundColor: '#0d47a1' },
  { id: "4", title: "Review 4", text: "Uvek zadovoljan uslugom, visoki standardi.", backgroundColor: '#004d40' },
  { id: "5", title: "Review 5", text: "Prijateljski tim i odlični rezultati!", backgroundColor: '#bf360c' },
];

const OnboardingItem = ({ item }) => {
  // Dohvatite širinu ekrana.
  const { width } = useWindowDimensions();

  return (
    // Svaki element liste ima širinu ekrana.
    <View style={[styles.onboardingItemContainer, { width, backgroundColor: item.backgroundColor }]}>
      {/* Horizontalni padding je sada ovde, unutar svakog elementa. */}
      <View style={styles.reviewContentWrapper}>
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
      {/* FlatList sada radi sa punom širinom ekrana. */}
      <FlatList
        data={REVIEW_DATA}
        renderItem={({ item }) => <OnboardingItem item={item} />}
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
      />
      <Paginator data={REVIEW_DATA} scrollX={scrollX} />
    </View>
  );
};

const AboutUsScreen = () => {
    const { height: screenHeight } = Dimensions.get("window");
    const DummyAboutUsInfo = () => <Text style={styles.dummyText}>[ AboutUsInfo komponenta ]</Text>;
    const DummyListAboutUs = () => <Text style={styles.dummyText}>[ ListAboutUs komponenta ]</Text>;
    const DummyContactUs = () => <Text style={styles.dummyText}>[ ContactUs komponenta ]</Text>;
  
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Image
            source={{ uri: "https://placehold.co/1000x1000/000000/FFFFFF?text=Logo+Barber" }}
            style={[styles.backImage, { height: screenHeight * 0.35 }]}
          />
          
          <View style={styles.contentContainer}>
            <DummyAboutUsInfo />
            <DummyListAboutUs />
            {/* Onboarding komponenta je sada ovde, bez paddinga u roditelju */}
            <OnboardingComponent />
            <DummyContactUs />
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
        width: '100%',
        resizeMode: 'cover',
        opacity: 0.2,
        marginBottom: 20,
    },
    contentContainer: {
        // Horizontalni padding se odnosi na ostale komponente
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    dummyText: {
        color: 'gray',
        fontSize: 16,
        textAlign: 'center',
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
        // Padding ostaje na tekstu
        paddingHorizontal: 20,
    },
    onboardingItemContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    reviewContentWrapper: {
        // Novi omotač za sadržaj unutar OnboardingItem-a koji nosi padding
        padding: 20,
    },
    reviewTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    reviewText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
    paginatorContainer: {
        flexDirection: "row",
        height: 64,
        alignItems: "center",
        justifyContent: 'center',
    },
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
        marginHorizontal: 8,
    },
});

export default AboutUsScreen;
