// src/screens/Splash/SplashScreen.jsx

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTheme, FontSizes, Fonts } from '../../theme/theme';

const SplashScreen = () => {
  const navigation = useNavigation();
  const { colors, isDarkMode } = useTheme();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in → wait → fade out
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.delay(800),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    const timeout = setTimeout(() => {
      // navigation.replace('HomeMain');
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      {/* 🔹 STATUS BAR (THEME AWARE) */}
      <StatusBar
        translucent={false}
        backgroundColor={colors.background} // Android
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />

      <Animated.Image
        source={require('../../../assets/Logo.png')}
        style={[styles.logo, { opacity: fadeAnim }]}
        resizeMode="contain"
      />

      <Animated.Text
        style={[
          styles.appName,
          {
            opacity: fadeAnim,
            color: colors.textPrimary,
          },
        ]}
      >
        Radio Masti 89.6
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;

/* =====================================================
   STYLES (THEME READY)
===================================================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },

  appName: {
    fontSize: FontSizes.medium,
    fontFamily: Fonts.primary.bold,
  },
});
