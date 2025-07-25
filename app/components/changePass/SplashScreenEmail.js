import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect } from "react";

const SplashScreenEmail = () => {
  const animationRef = useRef(null); // Create a ref to control the animation imperatively

  // Example: Play animation on component mount (autoplay is also an option)
  useEffect(() => {
    // Optional: play the animation when the component mounts
    animationRef.current?.play();
  }, []);
  
  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef} // Assign the ref to control it programmatically
        source={require("./../../../assets/images/nuvemconnect-email.json")}
        autoPlay // Automatically play the animation when loaded
        loop // Loop the animation indefinitely
        style={styles.lottieAnimation}
        // onAnimationFinish={() => console.log('Animation finished!')} // Callback when animation completes
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  lottieAnimation: {
    width: 250,
    height: 250,
    backgroundColor: "#fff", // Or 'transparent' if your animation has transparent background
  },
});
export default SplashScreenEmail;
