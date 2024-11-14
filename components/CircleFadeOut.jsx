import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const CircleFadeOut = () => {
  const [isVisible, setIsVisible] = useState(true);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(
        0,
        {
          duration: 5000,
          easing: Easing.out(Easing.exp),
        },
        () => {
          // setIsVisible(false); // Hide after fading out
        }
      );
    }
  }, [isVisible, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      backgroundColor: "#17A563", // Change this color to your desired color
      // borderRadius: width / 2,
      width: width,
      height: height,
      // position: "absolute",
      // top: (height - width) / 2,
      // left: 0,
    };
  });

  return (
    <View style={styles.container}>
      {isVisible && <Animated.View style={[styles.circle, animatedStyle]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Background color of your app
  },
  circle: {
    position: "absolute",
  },
});

export default CircleFadeOut;
