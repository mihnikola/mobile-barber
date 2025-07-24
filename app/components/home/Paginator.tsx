import { StyleSheet, Animated, useWindowDimensions, View } from "react-native";

const Paginator = ({ data, scrollX }) => {

    const {width} = useWindowDimensions();

  return (
    <View style={{ flexDirection: "row", height: 64 }}>
      {data.map((_, index: number) => {

        const inputRange = [(index-1) * width, index * width, (index+1) *width];

        const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: "clamp",
        })

        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
        })

        return <Animated.View key={index} style={[styles.dot, { width: dotWidth, opacity }]} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: "#ffffff",
    marginHorizontal: 8,
  },
});

export default Paginator;
