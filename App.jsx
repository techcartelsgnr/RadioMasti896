import { StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'

import DrawerNavigation from './src/navigation/DrawerNavigation'
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from "./src/theme/ThemeContext";
import SplashScreen from './src/screens/common/SplashScreen';

// ✅ NEW
import { Provider } from 'react-redux';
import store from './src/redux/store';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
<>
    <Provider store={store}>   {/* 🔥 FIX HERE */}
      <ThemeProvider>
        <NavigationContainer>
          {isLoading ? (
            <SplashScreen />
          ) : (
            <DrawerNavigation />
          )}
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
    </>
  )
}

const styles = StyleSheet.create({})