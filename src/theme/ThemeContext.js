// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { Appearance } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { DarkColors, LightColors, toggleTheme } from '../theme/theme';

// const ThemeContext = createContext();

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };

// export const ThemeProvider = ({ children }) => {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [userPreference, setUserPreference] = useState(false); // 🔑

//   useEffect(() => {
//     initTheme();
//     const subscription = Appearance.addChangeListener(({ colorScheme }) => {
//       if (!userPreference) {
//         const isDark = colorScheme === 'dark';
//         setIsDarkMode(isDark);
//         toggleTheme(isDark);
//       }
//     });

//     return () => subscription.remove();
//   }, [userPreference]);

//   const initTheme = async () => {
//     try {
//       const savedTheme = await AsyncStorage.getItem('app_theme');

//       if (savedTheme) {
//         const dark = savedTheme === 'dark';
//         setIsDarkMode(dark);
//         setUserPreference(true);
//         toggleTheme(dark);
//       } else {
//         const systemTheme = Appearance.getColorScheme();
//         const dark = systemTheme === 'dark';
//         setIsDarkMode(dark);
//         toggleTheme(dark);
//       }
//     } catch (e) {
//       console.log('Theme init error:', e);
//     }
//   };

//   const toggleThemeMode = async () => {
//     const newDarkMode = !isDarkMode;
//     setIsDarkMode(newDarkMode);
//     setUserPreference(true);
//     toggleTheme(newDarkMode);

//     try {
//       await AsyncStorage.setItem(
//         'app_theme',
//         newDarkMode ? 'dark' : 'light'
//       );
//     } catch (error) {
//       console.log('Error saving theme:', error);
//     }
//   };

//   return (
//     <ThemeContext.Provider
//       value={{
//         isDarkMode,
//         toggleTheme: toggleThemeMode,
//         colors: isDarkMode ? DarkColors : LightColors,
//       }}
//     >
//       {children}
//     </ThemeContext.Provider>
//   );
// };


// src/theme/ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkColors, LightColors } from './theme';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  // ✅ ALWAYS START LIGHT
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadSavedTheme();
  }, []);

  const loadSavedTheme = async () => {
    const saved = await AsyncStorage.getItem('APP_THEME');
    if (saved === 'dark') {
      setIsDarkMode(true);
    }
  };

  const toggleTheme = async () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    await AsyncStorage.setItem('APP_THEME', next ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        colors: isDarkMode ? DarkColors : LightColors,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
