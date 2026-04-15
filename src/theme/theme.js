// src/theme/theme.js

import React, { useState, useEffect } from 'react';
import { Dimensions, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

/* =====================================================
   LOGO-BASED COLOR PALETTE
===================================================== */

/* 🔆 LIGHT THEME (DEFAULT) */
export const LightColors = {
  primary: '#8B0038',              // Logo magenta
  primaryLight: '#C1004D',
  primaryDark: '#5A0024',

  primaryGradientStart: '#8B0038',
  primaryGradientEnd: '#C1004D',

  secondary: '#FFD166',            // Emoji yellow
  secondaryDark: '#E6B84F',

  background: '#FFFFFF',
  cardBackground: '#FFF5F8',
  surface: '#F8F8F8',
  elevated: '#FFFFFF',

  textPrimary: '#1A1A1A',
  textSecondary: '#555555',
  textTertiary: '#777777',
  textAccent: '#8B0038',

  accent: '#FFD166',
  success: '#2ECC71',
  warning: '#F39C12',
  error: '#E74C3C',
  info: '#8B0038',

  border: 'rgba(139,0,56,0.15)',
  divider: 'rgba(0,0,0,0.05)',
  shadow: 'rgba(0,0,0,0.1)',
};

/* 🌙 DARK THEME */
export const DarkColors = {
  primary: '#C1004D',
  primaryLight: '#E02A75',
  primaryDark: '#8B0038',

  primaryGradientStart: '#2B0A3D',  // Headphone purple
  primaryGradientEnd: '#8B0038',

  secondary: '#FFD166',

  background: '#000000',
  cardBackground: '#14000A',
  surface: '#1C0010',
  elevated: '#220015',

  textPrimary: '#FFFFFF',
  textSecondary: '#CCCCCC',
  textTertiary: '#999999',
  textAccent: '#FFD166',

  accent: '#FFD166',
  success: '#2ECC71',
  warning: '#F1C40F',
  error: '#E74C3C',
  info: '#C1004D',

  border: 'rgba(255,255,255,0.08)',
  divider: 'rgba(255,255,255,0.04)',
  shadow: 'rgba(0,0,0,0.6)',
};

/* =====================================================
   THEME MANAGER (SINGLE SOURCE)
===================================================== */

class ThemeManager {
  constructor() {
    this.isDarkMode = false; // ✅ ALWAYS START LIGHT
    this.colors = LightColors;
    this.listeners = new Set();
  }

  setTheme(isDark) {
    this.isDarkMode = isDark;
    this.colors = isDark ? DarkColors : LightColors;
    this.notify();
  }

  toggleTheme() {
    this.setTheme(!this.isDarkMode);
  }

  notify() {
    this.listeners.forEach(cb =>
      cb(this.colors, this.isDarkMode)
    );
  }

  addListener(cb) {
    this.listeners.add(cb);
  }

  removeListener(cb) {
    this.listeners.delete(cb);
  }

  getColors() {
    return this.colors;
  }
}

const themeManager = new ThemeManager();

/* =====================================================
   THEME HOOK
===================================================== */

export const useTheme = () => {
  const [state, setState] = useState({
    colors: themeManager.getColors(),
    isDarkMode: themeManager.isDarkMode,
  });

  useEffect(() => {
    const listener = (colors, isDark) => {
      setState({ colors, isDarkMode: isDark });
    };

    themeManager.addListener(listener);
    return () => themeManager.removeListener(listener);
  }, []);

  return {
    ...state,
    toggleTheme: () => themeManager.toggleTheme(),
    setTheme: (isDark) => themeManager.setTheme(isDark),
  };
};

/* =====================================================
   HELPERS
===================================================== */

export const themedColor = (light, dark) =>
  themeManager.isDarkMode ? dark : light;

export const getColors = () => themeManager.getColors();
export const getIsDarkMode = () => themeManager.isDarkMode;
export const toggleTheme = () => themeManager.toggleTheme();
export const setTheme = (isDark) => themeManager.setTheme(isDark);

/* =====================================================
   SPACING & RADIUS
===================================================== */

export const Spacing = {
  xs: 4,
  sm: 8,
  smt: 10,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const BorderRadius = {
  sm: 6,
  md: 10,
  lg: 16,
  pill: 100,
};

/* =====================================================
   FONT SIZES (RFValue)
===================================================== */

const scale = Platform.OS === 'ios' ? 0.9 : 1;

export const FontSizes = {
  xsmall: RFValue(8 * scale),
  tiny: RFValue(10 * scale),
  small: RFValue(12 * scale),
  normal: RFValue(14 * scale),
  medium: RFValue(16 * scale),
  large: RFValue(18 * scale),
  xlarge: RFValue(22 * scale),
  title: RFValue(28 * scale),
  hero: RFValue(34 * scale),
};

/* =====================================================
   FONTS (YOUR UPLOADED FILES)
===================================================== */

export const Fonts = {
  primary: {
    regular: 'Baloo2-Regular',
    medium: 'Baloo2-Medium',
    bold: 'Baloo2-Bold',
  },

  roboto: {
    regular: 'Roboto-Regular',
    medium: 'Roboto-Medium',
    bold: 'Roboto-Bold',
  },

  hindi: {
    regular: 'TiroDevanagariHindi-Regular',
  },
  decorative: {
    script: 'OleoScript-Bold',
    graffiti: 'ProtestRiot-Regular',
  },
  clash: {
    regular: 'ClashDisplay-Regular',
    medium: 'ClashDisplay-Medium',
    bold: 'ClashDisplay-Bold',
  },
   pacifico: {
    regular: 'Pacifico-Regular',
  },
};

/* =====================================================
   TEXT STYLES
===================================================== */

export const TextStyles = {
  heading: {
    fontFamily: Fonts.primary.bold,
    fontSize: FontSizes.xlarge,
    letterSpacing: 0.6,
  },

  subHeading: {
    fontFamily: Fonts.primary.regular,
    fontSize: FontSizes.large,
  },

  roboto: {
    fontFamily: Fonts.roboto.regular,
    fontSize: FontSizes.normal,
  },

  caption: {
    fontFamily: Fonts.roboto.regular,
    fontSize: FontSizes.small,
  },

  button: {
    fontFamily: Fonts.primary.bold,
    fontSize: FontSizes.normal,
    letterSpacing: 0.7,
  },

  hindi: {
    fontFamily: Fonts.hindi.regular,
    fontSize: FontSizes.medium,
  },
};

/* =====================================================
   SHADOWS
===================================================== */

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },
};

/* =====================================================
   DEVICE SIZE
===================================================== */

const { width, height } = Dimensions.get('window');

export const DeviceSize = {
  width,
  height,
  wp: p => (width * p) / 100,
  hp: p => (height * p) / 100,
};

/* =====================================================
   UTILITIES
===================================================== */

export const ThemeUtils = {
  withOpacity: (hex, opacity) => {
    const c = hex.replace('#', '');
    const r = parseInt(c.substr(0, 2), 16);
    const g = parseInt(c.substr(2, 2), 16);
    const b = parseInt(c.substr(4, 2), 16);
    return `rgba(${r},${g},${b},${opacity})`;
  },
};

/* =====================================================
   DEFAULT EXPORT
===================================================== */

export default {
  useTheme,
  toggleTheme,
  setTheme,
  themedColor,
  getColors,
  getIsDarkMode,
  LightColors,
  DarkColors,
  Spacing,
  FontSizes,
  Fonts,
  BorderRadius,
  Shadows,
  TextStyles,
  DeviceSize,
  ThemeUtils,
};
