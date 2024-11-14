import React, { useEffect } from "react";
import { StyleSheet, Dimensions, Image, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  interpolate,
  Easing,
} from "react-native-reanimated";

import { SPLASH_SCREEN_DURATION } from "@/constants/General";
import logo from "@/assets/images/a1stores.png";

const { height } = Dimensions.get("window");
const HEIGHT = height + 100;

const SplashScreen = () => {
  const circleAnimateValue = useSharedValue(0);
  const logoAnimateValue = useSharedValue(0);
  // const textAnimateValue = useSharedValue(0);

  useEffect(() => {
    circleAnimateValue.value = withTiming(
      2000,
      {
        duration: 2000,
        easing: Easing.out(Easing.exp),
      },
      () => {
        logoAnimateValue.value = withTiming(
          3000,
          {
            duration: 3000,
            easing: Easing.inOut(Easing.exp),
          }
          //       () => {
          //         // After the logo animation, animate the text
          //         textAnimateValue.value = withDelay(
          //           200,
          //           withTiming(1, { duration: 1000 })
          //         );
          //       }
        );
      }
    );
  }, []);

  const circleStyle = useAnimatedStyle(() => ({
    height: interpolate(circleAnimateValue.value, [0, 2000], [200, HEIGHT]),
    width: interpolate(circleAnimateValue.value, [0, 2000], [200, HEIGHT]),
    borderRadius: interpolate(
      circleAnimateValue.value,
      [0, 2000],
      [100, HEIGHT / 2]
    ),
  }));

  const logoStyle = useAnimatedStyle(() => ({
    marginBottom: interpolate(
      logoAnimateValue.value,
      [0, 3000],
      [0, height / 2]
    ),
  }));

  // const textStyle = useAnimatedStyle(() => ({
  //   opacity: interpolate(textAnimateValue.value, [0, 1], [0, 1]),
  // }));

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={[styles.circle, circleStyle]} />
      <Animated.Image source={logo} style={[styles.logo, logoStyle]} />
      {/* <Animated.Text style={[styles.text, textStyle]}>
        Get your groceries delivered to your home
      </Animated.Text> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#17A563",
  },
  circle: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "white",
  },
  logo: {
    width: 200,
    resizeMode: "contain",
    marginBottom: 0,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default SplashScreen;
